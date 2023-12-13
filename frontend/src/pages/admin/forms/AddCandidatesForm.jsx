import PropTypes from "prop-types";

function AddCandidatesForm({ setShowForm }) {
  return (
    <div>
      <div>
        <h3>Candidate Info</h3>
        <hr />
        <form>
          <input type="text" placeholder="Candidate Name"></input>
          <input type="text" placeholder="Candidate Age"></input>
          <input type="button" value="Add Candidate" />
          <button onClick={setShowForm}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddCandidatesForm;

AddCandidatesForm.propTypes = {
  setShowForm: PropTypes.func.isRequired,
};
