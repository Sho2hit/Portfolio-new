// Import Custome Hooks
import useAxios from "./../../CustomeHooks/useAxios/useAxios";

// Import Components
import ContactForm from "./Form/Form";
import ContactDetails from "./Details/Details";
import ContactHeader from "./Header/Header";
import Loading from "./../Loading/Index";
import Error from "./../Error/Index";

// Main Contact Sass File
import "./Index.scss";
import { useEffect, useState } from "react";

// Main Contact Component
const Contact = () => {
  // Fetch data
  const {
    data: { header = {}, content = [] },
    success,
    isPending,
    error,
  } = useAxios("/Apis/contact.json", []);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (content.length > 1) {
      setData(content);
    }
    if (data.length > 0) {
      data[0].text_1 = "Faridabad";
      data[0].text_2 = "Haryana";
      data[0].text_3 = "India";
      data[1].text_1 = "+919899443298";
      data[1].text_2 = "";
      data[2].text_1 = "contact@openskytechsolution.com";
    }
  }, [content, data]);
  return (
    <section className="contact">
      {isPending && <Loading />}
      {success && (
        <div className="container">
          <div className="contact-inner">
            <section className="contact-info">
              <ContactHeader header={header} />
              <ContactDetails content={data} />
            </section>
            <ContactForm />
          </div>
        </div>
      )}

      {error && <Error message={error.message} name="Contact" />}
    </section>
  );
};

export default Contact;
