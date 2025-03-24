import Tags from "../../components/Tags";
import About from "./About/About"
import Actions from "./Actions/index"
import Contact from "./Contact/Contact";
import { HomepageContainer } from "./styles";


const Homepage = () => {
    return (

        <HomepageContainer>

            {/* <Actions></Actions>   */}
            <About></About>
            <Contact></Contact>

        </HomepageContainer>

    );
};

export default Homepage;