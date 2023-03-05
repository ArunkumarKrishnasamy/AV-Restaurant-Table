import React from "react";
import "../node_modules/bootstrap/js/src/modal.js";
function EditRecipe(props) {
  return (
    <>
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${props.RecipeData.id}`}
      >
        Edit
      </button>

      <div
        class="modal fade"
        id={`id${props.RecipeData.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Recipe
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div className="row">
                <input
                  type="text"
                  className="form-control col-auto mb-2"
                  placeholder="First Name"
                  value={props.RecipeData.first_name}
                />
                <input
                  type="text"
                  className="form-control col-auto "
                  placeholder="Last Name"
                  value={props.RecipeData.last_name}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditRecipe;
