import React, { useState } from "react"
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormComponent, { FormResult } from "./FormComponent";
import { dataStorageUrl } from "../constants";

/**
 * Styling for the ContentContainer component
 */
 const useStyles = makeStyles((theme) => ({
    alert: {
        margin: theme.spacing(2),
    },
    description: {
        marginLeft: theme.spacing(4),
    },
    paper: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(3),
    },
}));

const ContentContainer = () => {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const classes = useStyles();

    // Callback for the FormComponent. Allows updating of the UI based on the 
    // result of submitting the form.
    const handleFormResult = (result: FormResult) => {
        if (!result) {
            // Unexpected edge case, we should always have a result
            setSuccess(false);
            setMessage("An error occurred while processing your request. Please try again.");
        }

        setSuccess(result.success);
        setMessage(result.message);

        // Submit success/failure info to the backend API
        submitResult(result.success);
    };

    // When a user of the system successfully finds a service area name,
    // store a value of 1 in the backend, otherwise, store a value of 0.
    const submitResult = (success: boolean) => {
        const body = { result: success ? 1 : 0 };

        const data = {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        };

        // Wrap the call to the backend API in a try/catch. This action is not part of the 
        // customer experience, so no need to await the call and no need to inform the 
        // customer of an error.
        console.log(dataStorageUrl);
        try {
            fetch(dataStorageUrl, data);
        } catch (e) {
            console.log(JSON.stringify(e));
        }
    };

    return (
        <Container>
            <Paper className={classes.paper}>
                <Typography className={classes.title} id="content-container_title" variant="h4">
                    Welcome to the Health Authority Area Locator for British Columbia
                </Typography>
                <Typography className={classes.description} id="content-container_description" >
                    Please enter a latitude and longitude and click submit to find the name of your Community Health Service Area.
                </Typography>
                <FormComponent resultHandler={handleFormResult} />
                { 
                    message && 
                        <Alert className={classes.alert} id="content-container_alert" severity={success ? "success" : "warning"}>
                            {message}
                        </Alert>
                }
            </Paper>
        </Container>
    );
};

export default ContentContainer;