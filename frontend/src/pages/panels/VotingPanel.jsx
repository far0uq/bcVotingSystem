import "./VotingPanel.css";

function VotingPanel() {
  return (
    <div className="voting-panel d-flex flex-column">
      <select className="poll-dropdown" name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>

      <div className="voting-section d-flex flex-column align-items-center">
        <h1 className="mt-4"> This is the voting section</h1>
        <button>Cast Vote</button>
      </div>
    </div>
  );
}

export default VotingPanel;
