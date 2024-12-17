import { useState, useEffect } from "react";

function Grid({ onTotalAttemptsChange }) {
  //setNumber = number of grid
  const [number, setNumber] = useState(0);
  const [pairsNeed, setPairsNeed] = useState([]);
  const [clickedItem1, setClickedItem1] = useState();
  const [clickedItem2, setClickedItem2] = useState();
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [disabledItems, setDisabledItems] = useState([]);
  const [finalElements, setFinalElements] = useState([]);
  const [finalMessageDisplay, setFinalMessageDisplay] = useState(false);

  useEffect(() => {
    const numbersArray = Array.from(
      { length: number * number },
      (_, index) => index + 1
    );

    const needOfPairs = (number * number) / 2;
    setPairsNeed(needOfPairs);
    const pairsArray = [];
    for (let i = 0; i < needOfPairs; i++) {
      pairsArray.push(numbersArray[i]);
      pairsArray.push(numbersArray[i]);
    }

    const randomNumbers = pairsArray.sort(() => Math.random() - 0.5);
    setRandomNumbers(randomNumbers);
  }, [number]);

  const clickedItem = (e) => {
    const value = parseInt(e.target.textContent);
    const id = e.target.getAttribute("data-id");

    setDisabledItems((prev) => [...prev, id]);

    if (parseInt(clickedItem1) > 0) {
      setClickedItem2(value);
    } else {
      setClickedItem1(value);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (clickedItem1 && clickedItem2) {
        const equality = clickedItem1 === clickedItem2;
        console.log("Equality check", equality);

        if (equality) {
          setFinalElements((prev) => [...prev, clickedItem1, clickedItem2]);
        }
        setDisabledItems([]);
        setClickedItem1();
        setClickedItem2();
        setTotalAttempts(totalAttempts + 1);
        onTotalAttemptsChange(totalAttempts);
      }
    }, 400);
  }, [clickedItem1, clickedItem2]);

  //check if u win:
  useEffect(() => {
    if (finalElements.length / 2 === pairsNeed && pairsNeed != 0) {
      setFinalMessageDisplay(true);
    }
  }, [finalElements, pairsNeed]);

  const changeNumber = (e) => {
    setNumber(Number(e.target.value));
  };

  const getNumbers = () => {
    return randomNumbers.map((value, index) => {
      const id = `item-${index}`;

      return (
        <div
          className={`grid-item ${
            disabledItems.includes(id) ? "disabled" : ""
          } ${finalElements.includes(value) ? "match" : ""}`}
          key={index}
          data-id={id}
          onClick={clickedItem}
        >
          {value}
        </div>
      );
    });
  };

  useEffect(() => {
    const lengthForWin = finalElements.length / 2;
    if (lengthForWin === pairsNeed) setFinalMessageDisplay(true);
    // console.log(lengthForWin);
  }, [finalElements]);

  // const afisare = () => {
  //   console.log("just display it:", pairsNeed, finalElements);
  // };

  return (
    <>
      {/* <button onClick={() => afisare()}>check</button> */}
      <div className="grid-main">
        <div className="grid-form">
          <label>Grid Size:</label>
          <select name="" id="options" onChange={changeNumber}>
            <option value="" disabled selected>
              Choose
            </option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
        </div>
        {number > 0 && (
          <div
            className="grid-container"
            style={{
              gridTemplateColumns: `repeat(${number}, 1fr)`,
              gridTemplateRows: `repeat(${number}, 1fr)`,
              gap: "10px",
            }}
          >
            {getNumbers()}
          </div>
        )}
        {finalMessageDisplay && (
          <div className="finalMessage">
            <h1>Congratulations!</h1>
            <p>You won after {totalAttempts} attempts</p>
            <p>Plese press the refresh button to restart the game!</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Grid;
