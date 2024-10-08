import { useRef } from "react";

// Import Custome Hooks
import useAxios from "./../../CustomeHooks/useAxios/useAxios";
import { useDarkTheme } from "./../../CustomeHooks/useDarkTheme/useDarkTheme";
import useThrottle from "./../../CustomeHooks/useThrottle/useThrottle";

// Import Components
import Loading from "./../Loading/Index";
import Error from "./../Error/Index";

// Main Header Sass File
import "./Index.scss";

const Header = () => {
  const darkTheme = useDarkTheme();
  const { throttle } = useThrottle();

  // Fetch data
  const {
    data: {
      title = { before: "", word: "", after: "" },
      body = "",
      button = "",
      image = "",
      image_dark = "",
    },
    success,
    isPending,
    error,
  } = useAxios("/Apis/header.json", []);

  // Scroll To Services Section Ref
  const header = useRef();

  // Scroll To Services Section Function
  const exploreFn = throttle(() => {
    window.scrollTo({
      top: header.current.offsetHeight,
      behavior: "smooth",
    });
  }, 1000);

  return (
    <header className="main-header" ref={header}>
      {isPending && <Loading />}

      <div className="container">
        {success && (
          <div style={{
            marginTop:'2rem'
          }} className="header-inner">
            <section className="header-desc">
              <h1 className="header-title">
                <span>Digital Solution </span> With 10 Years Of Experience
              </h1>
              <p className="header-paragraph">
                Welcome to OpenSky Tech Solution, your one-stop destination for
                comprehensive digital marketing solutions. With a passion for
                innovation and a decade of expertise, we specialize in
                transforming your digital presence into a powerful tool for
                growth.
              </p>
              <button className="header-btn" onClick={exploreFn}>
                {button}
              </button>
            </section>

            <section className="header-image">
              <img
                src={
                  darkTheme
                    ? `/Agency${image_dark.slice(1)}`
                    : `/Agency${image.slice(1)}`
                }
                alt="header-Illustration"
                draggable="false"
              />
            </section>
          </div>
        )}
      </div>

      {error && <Error message={error.message} name="Header" />}
    </header>
  );
};

export default Header;
