import React, { useState } from "react";

function RecipeTable() {
  let data = [
    { id: "1", fname: "Mark", lname: "Mark" },
    { id: "2", fname: "otto", lname: "otto" },
  ];
  const [newRecipe, setnewRecipe] = useState(data);
  const [addrecipe, setAddrecipe] = useState(false);
  function CreateRow() {
    const rows = {
      id: newRecipe.length + 1,
      fname: "",
      lname: "",
    };
    setnewRecipe([...newRecipe, rows]);
    setAddrecipe(false);
  }
  function AddRecipe(index, e) {
    const { name, value } = e.target;
    const rows = [...newRecipe];
    rows[index][name] = value;
    console.log(rows);
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
      <tbody>
        {newRecipe.map((row, index) => {
          const { fname, lname } = row;
          return addrecipe ? (
            <tr key={index}>
              <th scope="row">{row.id}</th>

              <td>{row.fname}</td>
              <td>{row.lname}</td>
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
                  value={fname}
                  onChange={(e) => onChange(index, e)}
                  name="fname"
                  className="form-control"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={lname}
                  onChange={(e) => onChange(index, e)}
                  name="lname"
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
      </tbody>
    </table>
  );
}

export default RecipeTable;
