import React, { useState } from "react";
import { Link } from "react-router-dom";

function Topbar() {
  const [recipes, setRecipes] = useState(true);
  const [ingredients, setIngredients] = useState(false);
  function HandleIngredientClass() {
    setRecipes(false);
    setIngredients(true);
  }
  function HandleRecipeClasss() {
    setRecipes(true);
    setIngredients(false);
  }
  return (
    <div className="title">
      <div className="Header text-center">
        <h1 className="text-success"> Restaurant Management</h1>
        <hr class="border border-primary border-3 opacity-75"></hr>
      </div>
      <Link to={"/"}>
        <button
          type="button"
          className={
            recipes ? "btn btn-dark m-2 " : "btn btn-outline-dark m-2 recipes"
          }
          onClick={HandleRecipeClasss}
        >
          Recipes
        </button>
      </Link>
      <Link to={"/ingredients"}>
        <button
          type="button"
          className={
            ingredients ? "btn btn-warning m-2" : "btn btn-outline-warning m-2"
          }
          onClick={HandleIngredientClass}
        >
          Ingredients
        </button>
      </Link>
      <div className="row">
        <div className="col-6 mt-2">
          <div className="input-group ">
            <form className="d-flex border border-secondary border-2 rounded">
              <i
                className="fa fa-search d-flex align-items-center m-2"
                aria-hidden="true"
              ></i>
              <input
                type={"search"}
                className="searchbar"
                placeholder="Search..."
              />
            </form>
            <button
              type="submit"
              className="btn btn-outline-secondary border border-secondary border-2 rounded filter"
            >
              Filter
            </button>
          </div>
        </div>
        <div className="col-2 mt-2  d-flex justify-content-end">
          <div className="btn-group  ">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Column
            </button>
            <ul className="dropdown-menu">
              <li className="dropdown-item">Action</li>

              <li className="dropdown-item">Something else here</li>
              <li>
                <hr class="dropdown-divider" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
