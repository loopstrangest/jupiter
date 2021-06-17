//redux and routes
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { forecastURL } from "../api";
import { fetchAndSummarizeForecast } from "../actions/searchAction";

//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Search = () => {
  const dispatch = useDispatch();

  //try to fetch forecast on enter keyup
  useEffect(() => {
    document.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        getSearchResults();
        e.preventDefault();
      }
    });
  });

  async function getSearchResults() {
    //get inputted zip code
    var zipCodeSearch = document.getElementById("zipCodeSearch");
    var zipCode = zipCodeSearch.value;
    try {
      const forecastAPIData = await axios.get(forecastURL(zipCode));
    } catch (err) {
      zipCodeSearch.value = "";
      //show invalid zip code visual
      zipCodeSearch.classList.add("error");
      setTimeout(function () {
        zipCodeSearch.classList.remove("error");
      }, 300);
      return;
    }
    dispatch(fetchAndSummarizeForecast(zipCode));
    zipCodeSearch.value = "";
  }

  return (
    <StyledSearch>
      <input id="zipCodeSearch" type="search" placeholder="Enter US zip code" />
      <button id="searchButton" onClick={getSearchResults}>
        Check Weather
      </button>
    </StyledSearch>
  );
};

const StyledSearch = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 0.5rem;
  width: 100%;
  * {
    font-size: 20px;
  }

  #zipCodeSearch {
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    background: white;
    margin: auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .error {
    background: rgba(255, 0, 0, 0.8) !important;
    position: relative;
    animation: shake 0.1s linear;
    animation-iteration-count: 3;
  }

  @keyframes shake {
    0% {
      left: -5px;
    }
    100% {
      right: -5px;
    }
  }

  #searchButton {
    cursor: pointer;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    background-color: #e1ffa1;
    border: 1px solid black;
    border-radius: 10px;
  }

  #searchButton:hover {
    box-shadow: 0px -4px 2px #e1ffa1, 0px 4px 2px #e1ffa1, -4px 0px 2px #e1ffa1,
      4px 0px 2px #e1ffa1;
  }
`;

export default Search;
