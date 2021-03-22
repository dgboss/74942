import { createMount, createShallow } from "@material-ui/core/test-utils";
import { configure, shallow as enzymeShallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FormComponent from './FormComponent';

configure({adapter: new Adapter()})

describe("<FormComponent />", () => {
    let shallow: typeof enzymeShallow;
    const mockFormResultHandler = jest.fn();

    beforeAll(() => {
        shallow = createShallow();
    });

    it("should render", () => {
        shallow(<FormComponent resultHandler={mockFormResultHandler}/>);
    });

    it("should render initial layout", () => {
        const wrapper = shallow(<FormComponent resultHandler={mockFormResultHandler}/>);
        expect(wrapper.getElements()).toMatchSnapshot();
    });

    it("should call resultHandler callback on form submit", () => {
        const wrapper = shallow(<FormComponent resultHandler={mockFormResultHandler}/>);
        wrapper.find("#form-component_form").simulate("submit", { preventDefault: () => {} });
        setTimeout(() => {
            expect(mockFormResultHandler).toHaveBeenCalledTimes(1);
        }, 0);
    });
});