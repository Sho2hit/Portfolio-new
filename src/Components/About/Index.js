import React from "react";

// Import Custome Hooks
import useAxios from "./../../CustomeHooks/useAxios/useAxios";

// Import Components
import AboutHeader from "./Header/Header";
import AboutBody from "./Body/Body";
import Loading from "./../Loading/Index";
import Error from "./../Error/Index";

// Main About Sass File
import "./Index.scss";

// Main About Component
const About = () => {
  // Fetch data
  const {
    data: { header = {}, content = {} },
    success,
    isPending,
    error,
  } = useAxios("/Apis/about.json", []);
  const headers = {
    body: "Learn how we helped our several clients grow their businesses online.",
    title: "About US",
  };
  const contents = {
    image: "./Images/About/about.svg",
    image_dark: "./Images/About/about-dark.svg",
    paragraph_1:
      "Welcome to OpenSky Tech Solution, your premier digital marketing agency based in Faridabad, Haryana, India. With over a decade of experience, we specialize in delivering top-tier digital solutions designed to boost your brand’s online visibility and performance. Our expertise spans across:",
    paragraph_2:
      "- Social Media Management: Enhance your brand’s presence and engagement on all major social platforms. \n \n - Web Development: Create stunning, user-friendly websites that drive results.\n \n - Graphic Design: Design visually impactful graphics that communicate your brand's message.\n \n- Content Creation: Develop high-quality content that resonates with your audience and drives traffic.\n \n- Google Ads: Implement effective advertising strategies to increase visibility and conversions.",
    paragraph_2_more:
      "At OpenSky Tech Solution, our mission is to empower businesses with innovative digital strategies that deliver measurable results. Partner with us to transform your digital presence and achieve your business goals. Contact us today to learn more!",
    title: "#1 Digital Solution With 10 Years Of Experience",
  };
  return (
    <section className="about">
      {isPending && <Loading />}
      {console.log("header", header)}
      {console.log(content)}
      {success && (
        <div className="container">
          <AboutHeader header={headers} />
          <AboutBody content={contents} />
        </div>
      )}

      {error && <Error message={error.message} name="About" />}
    </section>
  );
};

export default About;
