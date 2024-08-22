import React, { useState, useEffect, useRef } from "react";

// Import Custome Hooks
import useAxios from "./../../CustomeHooks/useAxios/useAxios";
import { useDarkTheme } from "./../../CustomeHooks/useDarkTheme/useDarkTheme";

// Import Components
import PortfolioProjects from "./Projects/Projects";
import PortfolioNav from "./Nav/Nav";
import PortfolioHeader from "./Header/Header";
import Loading from "./../Loading/Index";
import Error from "./../Error/Index";

// Main About Sass File
import "./Index.scss";

// Portfolio Background
const PortfolioBg = {
  backgroundImage: "url('./Images/Portfolio/background.svg')",
};

const PortfolioBgDark = {
  backgroundImage: "url('./Images/Portfolio/background-dark.svg')",
};

// Main Portfolio Component
const Portfolio = () => {
  // Custome Hooks
  const darkTheme = useDarkTheme();
  const [data, setData] = useState([]);
  // Fetch data
  const {
    data: { header = {}, nav = [], projects = [] },
    success,
    isPending,
    error,
  } = useAxios("/Apis/portfolio.json", []);

  // Refs
  const projectsContainer = useRef();

  // Type State
  const [type, setType] = useState("All Work");

  // Chang Type Of Projects Viewed
  const changeType = (value) => {
    if (value !== type && projectsContainer) {
      projectsContainer.current.classList.add("change-type");

      setTimeout(() => {
        projectsContainer.current.classList.remove("change-type");
      }, 500);

      setTimeout(() => {
        setType(value);
      }, 300);
    }
  };

  useEffect(() => {
    if (projects.length > 0) {
      setData(projects);
    }
    if (data.length > 0) {
      data[0].caption = "ERP";
      data[1].caption = "E-Commerce";
      data[2].caption = "NGO";
    }
  }, [projects, data]);

  return (
    <section
      className="portfolio"
      style={
        darkTheme
          ? success
            ? PortfolioBgDark
            : null
          : success
          ? PortfolioBg
          : null
      }
    >
      {isPending && <Loading />}
      {success && (
        <div className="container">
          <PortfolioHeader header={header} />
          <section className="portfolio-body">
            <PortfolioNav nav={nav} type={type} changeType={changeType} />
            <PortfolioProjects
              projects={data}
              type={type}
              projectsContainer={projectsContainer}
            />
          </section>
        </div>
      )}

      {error && <Error message={error.message} name="Portfolio" />}
    </section>
  );
};

export default Portfolio;
