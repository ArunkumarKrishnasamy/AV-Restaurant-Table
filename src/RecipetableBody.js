import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import EditRecipe from "./EditRecipe";

function RecipetableBody() {
  const [recipeData, setRecipeData] = useState([]);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.first_name) {
        errors.first_name = "Please Enter firstname";
      }
      if (!values.last_name) {
        errors.last_name = "Please Enter lastname";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await axios.put(`http://localhost:5000/recipes/${recipeId}`, values);
          FetchData();
          setInputrow(false);
          alert("recipe Edited");
        } else {
          await axios.post("http://localhost:5000/recipes", values);
          FetchData();
          setInputrow(false);
          alert("recipe added");
          formik.resetForm();
        }
      } catch (error) {
        alert("Error in posting data");
        console.log(error);
      }
    },
  });
  const FetchData = async () => {
    try {
      let Data = await axios.get("http://localhost:5000/recipes");
      setRecipeData(Data.data);
    } catch (error) {
      console.log(error);
      alert("Error occurred");
    }
  };
  useEffect(() => {
    FetchData();
  }, []);

  const [Inputrow, setInputrow] = useState(false);
  function CreateRow() {
    const addRow = {
      // id: recipeData.id,
      first_name: "",
      last_name: "",
    };
    console.log("row created");
    setInputrow(false);
    setRecipeData([...recipeData], addRow);
  }
  const [isEdit, setIsEdit] = useState(false);
  const [recipeId, setRecipeId] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const HandleEdit = async (id) => {
    try {
      let EditData = await axios.get(`http://localhost:5000/recipes/${id}`);
      formik.setValues({
        first_name: EditData.data.first_name,
        last_name: EditData.data.last_name,
      });
      setInputrow(!Inputrow);
      setIsEdit(true);
      setRecipeId(EditData.data.id);
      FetchData();
    } catch (error) {
      console.log(error);
      alert("Error in Editing");
    }
  };
  const HandleDelete = async (id) => {
    try {
      let ask = window.confirm("Are You Sure do you want to DELETE?");

      if (ask) {
        await axios.delete(`http://localhost:5000/recipes/${id}`);
        FetchData();
      }
    } catch (error) {
      console.log(error);
      alert("Error in Deleting");
    }
  };
  return (
    <tbody>
      {recipeData.map((row, index) => {
        const { first_name, last_name } = row;
        if (showEdit) {
          return (
            <tr>
              <th scope="row">{row.id}</th>
              <td>
                <input
                  type="text"
                  id="first_name"
                  onChange={formik.handleChange}
                  name="first_name"
                  className="form-control"
                  value={formik.values.first_name}
                  onBlur={formik.handleBlur}
                />
                <span style={{ color: "red" }}>
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <div>{formik.errors.first_name}</div>
                  ) : null}
                </span>
              </td>
              <td>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                  onBlur={formik.handleBlur}
                  className="form-control"
                />
                <span style={{ color: "red" }}>
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <div>{formik.errors.last_name}</div>
                  ) : null}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={formik.handleSubmit}
                >
                  Add
                </button>
              </td>
            </tr>
          );
        } else {
          return (
            <>
              <tr key={index}>
                <th scope="row">{row.id}</th>

                <td className="col-auto">{first_name}</td>
                <td className="col-auto">{last_name}</td>
                <td>
                  {/* <EditRecipe RecipeData={row} /> */}
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      HandleEdit(row.id);
                    }}
                  >
                    {" "}
                    Edit
                  </button>
                  <button
                    className="ms-2 btn btn-danger"
                    onClick={() => {
                      HandleDelete(row.id);
                    }}
                  >
                    {" "}
                    X
                  </button>
                </td>
              </tr>
            </>
          );
        }
      })}
      {Inputrow ? (
        <tr>
          <th scope="row">{recipeData.length + 1}</th>
          <td>
            <input
              type="text"
              id="first_name"
              onChange={formik.handleChange}
              name="first_name"
              className="form-control"
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
            />
            <span style={{ color: "red" }}>
              {formik.touched.first_name && formik.errors.first_name ? (
                <div>{formik.errors.first_name}</div>
              ) : null}
            </span>
          </td>
          <td>
            <input
              type="text"
              name="last_name"
              id="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
              className="form-control"
            />
            <span style={{ color: "red" }}>
              {formik.touched.last_name && formik.errors.last_name ? (
                <div>{formik.errors.last_name}</div>
              ) : null}
            </span>
          </td>
          <td>
            <button className="btn btn-primary" onClick={formik.handleSubmit}>
              Add
            </button>
          </td>
        </tr>
      ) : null}
      <tr>
        <th className="text-primary bolder" onClick={CreateRow}>
          + Add
        </th>
      </tr>
      {/* <div className="row">
            <div className="col-2">{recipeData.length + 1}</div>
            <div className="col-5">
              <input
                type="text"
                id="first_name"
                onChange={formik.handleChange}
                name="first_name"
                className="form-control"
                value={formik.values.first_name}
                onBlur={formik.handleBlur}
              />
              <span style={{ color: "red" }}>
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div>{formik.errors.first_name}</div>
                ) : null}
              </span>
            </div>
            <div className="col-5">
              <input
                type="text"
                name="last_name"
                id="last_name"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                onBlur={formik.handleBlur}
                className="form-control"
              />
              <span style={{ color: "red" }}>
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div>{formik.errors.last_name}</div>
                ) : null}
              </span>
            </div>
          </div> */}
    </tbody>
  );
}

export default RecipetableBody;
