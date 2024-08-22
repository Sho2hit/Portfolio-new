// Import Custome Hooks
import useAxios from "./../../CustomeHooks/useAxios/useAxios";

// Import Components
import TeamHeader from "./Header/Header";
import TeamBody from "./Body/Body";
import Loading from "./../Loading/Index";
import Error from "./../Error/Index";

// Main Team Sass File
import "./Index.scss";
import { Fragment } from "react";
import { useEffect, useState } from "react";

const Team = () => {
  // Fetch data
  const {
    data: { header = {}, content = [] },
    success,
    isPending,
    error,
  } = useAxios("/Apis/team.json", []);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(content.slice(0, 3));
    if (data.length > 0) {
      data[0].name = "Aman Singh";
      data[0].college = "YMCA Graduate";
      data[2].college = "Droan  College";
      data[1].college = "IIT Ropar(Ai&Ml)";
      data[1].name = "Shobhit Chaurasia";
      data[2].name = "Ritik";
      data[2].role = "Programmer";
      data[0].social[2].icon = "fab fa-linkedin";
      data[0].social[0].link =
        "https://www.instagram.com/cdt__aman?igsh=MWQ0NXNyaWlzbjF6aw==";
      data[1].social[2].icon = "fab fa-linkedin";
      data[1].social[0].link =
        "https://www.instagram.com/shobhit_chauras1a?igsh=MWpvbGZmd25naHl3Yg==";
      data[1].social[2].link =
        "https://www.linkedin.com/in/jaya-bandhu-0390882b0/";
      data[1].social[1].link =
        "https://x.com/Shobhit2482?t=ELDnwAZi5QItSUWy8adEcg&s=09";
      data[2].social[2].icon = "fab fa-linkedin";
    }
  }, [content,data]);

  return (
    <section className="team">
      {isPending && <Loading />}
      {success && (
        <Fragment>
          <TeamHeader header={header} />
          <TeamBody content={data} />
        </Fragment>
      )}

      {error && <Error message={error.message} name="Team" />}
    </section>
  );
};

export default Team;
