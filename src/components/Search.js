//redux and routes
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAndSummarizeForecast } from "../actions/searchAction";
import axios from "axios";
import { forecastURL } from "../api";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        getSearchResults();
        e.preventDefault();
      }
    });
  });

  async function getSearchResults() {
    var zipCodeSearch = document.getElementById("zipCodeSearch");
    var zipCode = zipCodeSearch.value;
    console.log("zip is", zipCode);
    try {
      const forecastAPIData = await axios.get(forecastURL(zipCode));
    } catch (err) {
      zipCodeSearch.value = "";
      zipCodeSearch.classList.add("error");
      setTimeout(function () {
        zipCodeSearch.classList.remove("error");
      }, 300);
      return;
    }
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
    border: none;
    color: black;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 0.3rem;
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
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

export default Search;
