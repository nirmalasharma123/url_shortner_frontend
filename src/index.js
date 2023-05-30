import React, { StrictMode } from "react";
import  ReactDOM  from "react-dom";
import App from "./App";
import "./App.css"

let root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)