import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import RecipeTable from "./RecipeTable";

function Recipes() {
  // const [data,setData]= useState("")

  return (
    <div className="container">
      <RecipeTable />
    </div>
  );
}

export default Recipes;
