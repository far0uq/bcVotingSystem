import PropTypes from "prop-types";
import "./AddCandidateForm.css";

function AddCandidateForm({ setShowForm }) {
  return (
    <>
      <div className="add-candidate-form">
        <h3>Add a new Candidate</h3>
        <hr />
        <form className="d-flex flex-column">
          <input type="name" name="name" />
          <input type="submit" value="Add Candidate" />
          <input
            type="button"
            value="Cancel"
            onClick={() => setShowForm(false)}
          />
        </form>
      </div>
      <div className="overlay"></div>
    </>
  );
}

export default AddCandidateForm;

AddCandidateForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
};
