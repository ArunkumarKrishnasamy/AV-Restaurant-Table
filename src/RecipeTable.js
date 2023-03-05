import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipetableBody from "./RecipetableBody";

function RecipeTable() {
  const [recipeData, setRecipeData] = useState([]);
  const FetchData = async () => {
    try {
      let Data = await axios.get("http://localhost:5000/recipes");
      //   const jsonData = Data.json();
      setRecipeData(Data.data);
      // console.log(Data.data);
      setAddrecipe(true);
    } catch (error) {
      console.log(error);
      alert("Error occurred");
    }
  };

  useEffect(() => {
    FetchData();
  }, []);
  const [newRecipe, setnewRecipe] = useState(recipeData);
  const [addrecipe, setAddrecipe] = useState(false);
  function CreateRow() {
    const rows = {
      id: newRecipe.length + 1,
      first_name: "",
      last_name: "",
    };
    // FetchData();
    setnewRecipe([...newRecipe, rows]);
    setAddrecipe(false);
  }
  function AddRecipe(index, e) {
    const { name, value } = e.target;
    const rows = [...newRecipe];
    rows[index][name] = value;

    setnewRecipe(rows);
    setAddrecipe(true);
  }
  const onChange = (index, e) => {
    const { name, value } = e.target;
    const rows = [...newRecipe];
    rows[index][name] = value;
    setnewRecipe(rows);
  };
  return (
    <table className="table m-2" id="RecipeTable">
      <thead>
        <tr>
          <th scope="col">S.No </th>
          <th scope="col">First Name </th>
          <th scope="col">Last Name </th>
          <th scope="col">Action</th>
          <th className="text-primary bolder" scope="col">
            + Add
          </th>
        </tr>
      </thead>
      {/* <tbody>
        {newRecipe.map((row, index) => {
          const { first_name, last_name } = row;
          return addrecipe ? (
            <tr key={index}>
              <th scope="row">{row.id}</th>

              <td>{row.first_name}</td>
              <td>{row.last_name}</td>
              <td>
                {" "}
                <button className="btn btn-warning">Edit</button>
              </td>
            </tr>
          ) : (
            <tr key={index}>
              <th scope="row">{row.id}</th>
              <td>
                <input
                  type="text"
                  value={first_name}
                  onChange={(e) => onChange(index, e)}
                  name="first_name"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={last_name}
                  onChange={(e) => onChange(index, e)}
                  name="last_name"
                  className="form-control"
                />
              </td>
              <td>
                {" "}
                <button
                  className="btn btn-primary"
                  onClick={(e) => AddRecipe(index, e)}
                >
                  Add
                </button>
              </td>
            </tr>
          );
        })}
        <tr>
          <th className="text-primary bolder" onClick={CreateRow}>
            + Add
          </th>
        </tr>
      </tbody> */}
      <RecipetableBody />
    </table>
  );
}

export default RecipeTable;
