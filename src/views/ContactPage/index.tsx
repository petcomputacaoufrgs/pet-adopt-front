import Contact from "../HomePage/5Contact";
import Footer from "../HomePage/6Footer";
import AuthorizationToast from "../../components/AuthorizationToast";

const ContactPage = () => {
  return (
    <>
      <AuthorizationToast />
      <div style={{ scrollMarginTop: "80px" }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
