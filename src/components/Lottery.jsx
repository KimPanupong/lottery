import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import renderRow from "./RenderRow";

function Lottery() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [randomPreviousNumber, setRandomPreviousNumber] = useState(0);
  const [randomNextNumber, setRandomNextNumber] = useState(0);
  const [randomPrize2, setRandomPrize2] = useState([0, 0, 0]);
  const [randomLast2, setrandomLast2] = useState(0);
  const [checkNumber, setCheckNumber] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    const loadRandomValue = (key) => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? parseInt(storedValue) : 0;
    };

    const loadRandomValues = () => {
      setRandomNumber(loadRandomValue("randomNumber"));
      setRandomPreviousNumber(loadRandomValue("randomPreviousNumber"));
      setRandomNextNumber(loadRandomValue("randomNextNumber"));
      setRandomPrize2([
        loadRandomValue("Prize2_1"),
        loadRandomValue("Prize2_2"),
        loadRandomValue("Prize2_3"),
      ]);
      setrandomLast2(loadRandomValue("randomLast2"));
    };

    loadRandomValues();
  }, []);

  const getRandomThreeNumber = () => Math.floor(Math.random() * 999) + 1;

  const RandomNumber = () => {
    const random = getRandomThreeNumber();
    const previousNumber = random - 1;
    const nextNumber = random + 1;
    const prize2 = [
      getRandomThreeNumber(),
      getRandomThreeNumber(),
      getRandomThreeNumber(),
    ];
    const Last2Number = Math.floor(Math.random() * 90) + 10;

    setRandomNumber(random);
    setRandomPreviousNumber(previousNumber);
    setRandomNextNumber(nextNumber);
    setRandomPrize2(prize2);
    setrandomLast2(Last2Number);

    const setLocalStorage = (key, value) => {
      localStorage.setItem(key, value);
    };

    setLocalStorage("randomNumber", random);
    setLocalStorage("randomPreviousNumber", previousNumber);
    setLocalStorage("randomNextNumber", nextNumber);
    setLocalStorage("Prize2_1", prize2[0]);
    setLocalStorage("Prize2_2", prize2[1]);
    setLocalStorage("Prize2_3", prize2[2]);
    setLocalStorage("randomLast2", Last2Number);
  };

  const checkPrize = () => {
    const inputDigits = checkNumber.toString().padStart(3, "0");
    const inputLastTwo = parseInt(inputDigits) % 100;

    if (parseInt(checkNumber) === randomNumber) {
      setResult(checkNumber + " : ถูกรางวัลที่ 1");
    } else if (
      [randomPreviousNumber, randomNextNumber].includes(parseInt(checkNumber))
    ) {
      setResult("ถูกรางวัลข้างเคียงรางวัลที่ 1");
    } else if (randomPrize2.includes(parseInt(checkNumber))) {
      setResult(checkNumber + " : ถูกรางวัลที่ 2");
    } else if (inputLastTwo === randomLast2) {
      setResult(checkNumber + " : ถูกรางวัลเลขท้าย 2 ตัว");
    } else {
      setResult(checkNumber + " : ไม่ถูกรางวัล");
    }
  };

  return (
    <div className="container">
      <p>ผลการออกรางวัลล็อตเตอรี่ Diversition</p>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={RandomNumber}
      >
        ดำเนินการสุ่มรางวัล
      </button>

      <div className="pt-3 pb-3 container">
        {renderRow("รางวัลที่ 1 :", randomNumber)}
        {renderRow(
          "รางวัลค้างเคียงรางวัลที่ 1 :",
          randomPreviousNumber,
          randomNextNumber
        )}
        {renderRow("รางวัลที่ 2 :", ...randomPrize2)}
        {renderRow("รางวัลเลขท้าย 2 ตัว :", randomLast2)}
      </div>

      <div>
        <p className="header">ตรวจรางวัลล็อตเตอรี่ Diversition</p>
        <label className=" mx-2">เลขล็อตเตอรี่ :</label>
        <input
          type="Number"
          value={checkNumber}
          onChange={(e) => setCheckNumber(e.target.value)}
        />
        <div>
          <div className="result mt-2">
            <p>{result}</p>
          </div>
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={checkPrize}
          >
            ตรวจรางวัล
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lottery;
