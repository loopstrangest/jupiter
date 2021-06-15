//redux and routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAndSummarizeForecast } from "../actions/searchAction";
//styling and animation
import styled from "styled-components";
import { motion } from "framer-motion";

const Search = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        getSearchResults();
        //e.preventDefault();
      }
    });
  });

  function getSearchResults() {
    var zipCode = document.getElementById("zipCodeSearch").value;
    console.log("zip is", zipCode);
    dispatch(fetchAndSummarizeForecast(zipCode));
    document.getElementById("zipCodeSearch").value = "";
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
  width: 50%;
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

  #searchButton {
    cursor: pointer;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }
`;

export default Search;
