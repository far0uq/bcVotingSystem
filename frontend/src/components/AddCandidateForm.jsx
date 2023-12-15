import PropTypes from "prop-types";
import "./AddCandidateForm.css";

import { useContractContext } from "../context/contractContext";
import { ethers } from "ethers";

function AddCandidateForm({ setShowForm }) {
  const { sharedData } = useContractContext();
  const handleAddCandidate = async () => {
    const name = document.querySelector("#name").value;
    const value = { value: ethers.parseEther("0.0001") };
    const transaction = await sharedData.contract.addCandidate(name, value);
    await transaction.wait();
    console.log("transaction successful");
  };

  return (
    <>
      <div className="add-candidate-form">
        <h3>Add a new Candidate</h3>
        <hr />
        <form
          className="d-flex flex-column"
          onSubmit={() => handleAddCandidate()}
        >
          <input type="name" name="name" id="name" />
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
