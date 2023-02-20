import React, { useState } from "react";

function Ingredients() {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Ingredient Name</th>
            <th scope="col">Type</th>
            <th scope="col">Item Price(per unit)</th>
            <th scope="col" className="text-primary bolder">
              + Add
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">1</td>
            <td>Pepper</td>
            <td>Ingredients</td>
            <td>$0.5</td>
          </tr>
          <tr>
            <th className="text-primary bolder">+ Add</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Ingredients;
