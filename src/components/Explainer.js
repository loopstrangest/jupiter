import { useDispatch } from "react-redux";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Explainer = () => {
  const dispatch = useDispatch();
  const toggleExplainer = () => {
    dispatch({ type: "TOGGLE_EXPLAINER" });
  };

  //use fontawesomeicons
  const mail = <FontAwesomeIcon class="icon" icon={faEnvelope} />;
  const twitter = <FontAwesomeIcon class="icon" icon={faTwitter} />;
  const home = <FontAwesomeIcon class="icon" icon={faHome} />;

  return (
    <ExplainerShadow onClick={toggleExplainer}>
      <Information>
        <p>Jupiter shows you the weather forecast for any US zip code.</p>
        <p>
          Enter a US zip code and click "Check Weather" or press the enter key
          to view the forecast. A brief visual indication will be shown for
          invalid zip codes.
        </p>
        <p>
          The forecast is provided in three hour intervals. Data shown: weather
          image and description, temperature, chance of rain, wind direction and
          speed.
        </p>
        <p>
          For each day, the high and low temperatures are shown above the
          forecast, along with the warning "💧 Rain Expected 💧" when
          applicable.
        </p>
        <p>
          Thanks to{" "}
          <a
            href="https://openweathermap.org/"
            target="_blank"
            rel="noreferrer"
          >
            <u>OpenWeather</u>
          </a>{" "}
          for providing the forecast data.
        </p>
        <hr />
        <p class="aboutMe">Contact the creator:</p>
        <div className="links">
          <a
            href="https://twitter.com/strangestloop"
            target="_blank"
            rel="noreferrer"
          >
            {twitter}
          </a>
          <a href="mailto:loopstrangest@gmail.com">{mail}</a>
          <a href="https://strangestloop.io" target="_blank" rel="noreferrer">
            {home}
          </a>
        </div>
      </Information>
    </ExplainerShadow>
  );
};

const ExplainerShadow = styled(motion.div)`
  width: 100%;
  display: flex;
  height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }
  &::-webkit-scrollbar-track {
    background: white;
  }
`;

const Information = styled(motion.div)`
  display: block;
  width: 75%;
  height: min-content;
  margin: auto;
  border-radius: 1rem;
  padding: 1rem 3rem;
  background: white;
  position: relative;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
  p {
    padding: 0.5rem 0rem;
  }
  hr {
    margin: 0.5rem 0rem;
  }

  .links,
  .aboutMe {
    display: flex;
    justify-content: center;
  }
  .aboutMe {
    text-align: center;
  }
  .links {
    margin-top: 0.5rem;
    height: 2rem;
  }
  .links a {
    display: inline-block;
    height: 100%;
  }
  .icon {
    height: 100%;
    padding: 0 0.5rem;
    color: #e1ffa1;
    cursor: pointer;
  }
  .icon path {
    stroke: black;
    stroke-width: 3;
  }
  .icon:hover {
    color: #ffb6e6;
  }
`;

export default Explainer;
