import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// import dotenv from 'dotenv';
import App from "./App";
import "./index.css"

import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "./components/context/FetchAccountContext";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <ChakraProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </ChakraProvider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </>
);
