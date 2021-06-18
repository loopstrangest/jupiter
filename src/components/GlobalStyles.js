import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Europa', sans-serif;
}
html{
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
}
body{
    width: 100%;
}
h1{
    text-align: center;
    font-size: 3rem;
}
h2{
    font-size: 2rem;
}
h3{
    text-align: center;
    font-size: 1.3rem;
}
p{
    font-size: 1.2rem;
}
a{
    text-decoration: none;
}
/* clear the 'X' from Internet Explorer */
input[type=search]::-ms-clear {  display: none; width : 0; height: 0; }
input[type=search]::-ms-reveal {  display: none; width : 0; height: 0; }

/* clear the 'X' from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration { display: none; }
`;

export default GlobalStyles;
