import React, { useState } from "react";

// Import Custome Hooks
import { useDarkTheme } from "./../../../CustomeHooks/useDarkTheme/useDarkTheme";
import useThrottle from "./../../../CustomeHooks/useThrottle/useThrottle";

// Main About Body Sass File
import "./Body.scss";

// About Body Component
const AboutBody = (props) => {
  const darkTheme = useDarkTheme();
  const { throttle } = useThrottle();

  const [readMore, setReadMore] = useState(false);

  // Handle Read More Function
  const handleReading = throttle((e) => {
    e.target.parentElement.style.opacity = "0";

    setTimeout(() => {
      setReadMore((prevReadMore) => !prevReadMore);
      e.target.parentElement.style.opacity = "1";
    }, 300);
  }, 700);

  const {
    content: {
      image,
      image_dark,
      title,
      paragraph_1,
      paragraph_1_more,
      paragraph_2,
      paragraph_2_more,
    },
  } = props;

  return (
    <section className="about-body">
      <div className="about-image">
        <img
          src={
            darkTheme
              ? `/Agency${image_dark.slice(1)}`
              : `/Agency${image.slice(1)}`
          }
          alt="About"
          draggable="false"
        />
      </div>

      <div className="about-desc">
        <h3 className="desc-title">{title}</h3>

        <p className="desc-paragraph">
          {!readMore ? paragraph_1 : paragraph_1_more}
        </p>

        <p className="desc-paragraph">
          {(!readMore ? paragraph_2 : paragraph_2_more)
            .split("\n")
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </p>

        <button className="desc-btn" onClick={handleReading}>
          {!readMore ? "Read More" : "Read Less"}
        </button>
      </div>
    </section>
  );
};

export default AboutBody;
