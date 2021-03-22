import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { openSourceUrl } from "../constants";

/**
 * A minimal interface for the response from the open soure API
 */
interface ApiResponse {
    features: Feature[];
}

/**
 * A minimal interface for the feature object in the response from the open source API
 */
interface Feature {
    type: string;
    id: string;
    properties: {
        CMNTY_HLTH_SERV_AREA_NAME: string
    }
}

/**
 * Props of the FormComponent.
 */
interface FormComponentProps {
    resultHandler: (result: FormResult) => void;
}

/**
 * Represents the object passed back to a parent component upon form submission.
 */
export interface FormResult {
    message: string;
    success: boolean;
}

/**
 * Possible error messages.
 */
 export enum ErrorMessages {
    // To display when invalid coordinates are entered, includes those outside of BC
    outOfAreaError = "A result could not be found for the coordinates you entered. This tool only works within the province of BC. Please check your coordinates and try again.",

    // To display when the request for the service area name fails 
    requestError = "An error occurred while processing your request. Please try again.",

    // To display when coordiantes are valid, but no service area name was returned
    unexpectedError = "The coordinates entered are valid, but there is no Community Health Service Area associated with this location."
}

/**
 * Styling for the FormComponent
 */
const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        width: 100,
    },
    form: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 250
        },
    }
}));

/**
 * A component used to accept user input and query an open source API. 
 */
const FormComponent = (props: FormComponentProps) => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latError, setLatError] = useState(false);
    const [lonError, setLonError] = useState(false);
    const { resultHandler } = props;
    const classes = useStyles();
    const url = `${openSourceUrl}&cql_filter=INTERSECTS(SHAPE,SRID=4326;POINT(${longitude} ${latitude}))`;

    const clearErrors = () => {
        setLatError(false);
        setLonError(false);
    };

    // Reset all user input and error messages.
    const handleClearButtonClick = () => {
        setLatitude("");
        setLongitude("");
        resultHandler({message: "", success: false});
        clearErrors();
    };

    // Handle submission of the form.
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        let result: FormResult = {
            message: "",
            success: false
        };

        clearErrors();

        // Validate that something has been entered in the form fields
        if (!validateForm()) {
            // An input is missing, exit the submit handler
            return;
        }
        
        let response: Response;

        // Perform the API request
        try {
            response = await fetch(url);
        } catch (e) {
            result.message = ErrorMessages.requestError;
            resultHandler(result);
            return;
        }

        if (!response.ok) {
            // An error occurred and a valid response was not received. Log to the console and display a friendly message to the user.
            console.log(`An error occurred when fetching the service area for coordinates ${latitude}, ${longitude}. The response has status code '${response.status} and message: ${response.statusText}`);
            result.message = ErrorMessages.requestError;
            resultHandler(result);
            return;
        }
        
        const json: ApiResponse = await response.json();
    
        if (json && json.features && json.features.length) {
            const firstFeature = json.features[0];

            if (firstFeature.properties && firstFeature.properties.CMNTY_HLTH_SERV_AREA_NAME) {
                // Display the service area name associated with the entered coordiantes
                result.message = `Your Community Service Health Area is: ${firstFeature.properties.CMNTY_HLTH_SERV_AREA_NAME}`;
                result.success = true;
            }
            else {
                // The request did not return an error, but the desired information is missing. Show a friendly message.  
                result.message = ErrorMessages.unexpectedError;
            }
        }
        else {
            // An empty response indicates that the coordinates are invalid or fall outside of the boundaries of BC.
            result.message = ErrorMessages.outOfAreaError;
        }

        resultHandler(result);
    }

    // Validate the form inputs to ensure a value has been entered.
    // TODO: Additional validation to ensure input are numbers, possibly constrained to 
    // coords representing a bounding box around the province.
    const validateForm = (): boolean => {
        let valid = true;

        // Indicate to the user that latitude is a required input
        if (!latitude) {
            setLatError(true);
            valid = false;
        }

        // Indicate to the user that longitude is a required input
        if (!longitude) {
            setLonError(true);
            valid = false;
        }

        return valid;
    };

    return (
            <Container>
                <form autoComplete="off" id="form-component_form" className={classes.form} noValidate onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            error={latError}
                            helperText={latError ? "Required" : ""}
                            id="latitude-input"
                            label="Latitude"
                            onChange={e => setLatitude(e.target.value)}
                            value={latitude}
                        />
                    </div>
                    <div>
                        <TextField
                            error={lonError}
                            helperText={lonError ? "Required" : ""}
                            id="longitude-input"
                            label="Longitude"
                            onChange={e => setLongitude(e.target.value)}
                            value={longitude}
                        />
                    </div>
                    <Button className={classes.button} color="primary" type="submit" variant="contained">
                        Submit
                    </Button>
                    <Button className={classes.button} onClick={handleClearButtonClick} variant="contained">
                        Clear
                    </Button>
                </form>
            </Container>
    );
};

export default FormComponent;