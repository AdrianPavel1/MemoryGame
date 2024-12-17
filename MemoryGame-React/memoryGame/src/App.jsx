import { useState } from "react";
import Grid from "./Grid";

function App() {
  const [totalAttempts, setTotalAttempts] = useState();
  const handleTotalAttemptsChange = (attempts) => {
    setTotalAttempts(attempts);
  };

  const refresh = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="game-container">
        <h1>Memory Game</h1>
        <Grid onTotalAttemptsChange={handleTotalAttemptsChange} />
        <div className="totalAttempts">
          Total Attempts:
          {totalAttempts ? totalAttempts + 1 : 1}
        </div>
        <button className="refreshButton" onClick={refresh}>
          Refresh
        </button>
      </div>
    </>
  );
}

export default App;
