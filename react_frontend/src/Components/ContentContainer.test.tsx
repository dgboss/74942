import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ContentContainer from './ContentContainer';

configure({adapter: new Adapter()})

describe("<ContentContainer />", () => {
    it("should render", () => {
        shallow(<ContentContainer />);
    });

    it("should render initial layout", () => {
        const wrapper = shallow(<ContentContainer />);
        expect(wrapper.getElements()).toMatchSnapshot();
    });
});