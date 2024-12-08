import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState(0);
  const [error, setError] = useState("");

  const calculateSum = (numbers) => {
    if (!numbers) return 0;

    let delimiter = /,|\\n/;
    const customDelimiterMatch = numbers.match(/^\/\/(.+)\\n/);

    // custom delimiter
    if (customDelimiterMatch) {
      numbers = numbers.replace(/^\/\/(.+)\\n/, "");
    }

    const numberArray = numbers
      .split(customDelimiterMatch ? customDelimiterMatch[1] : delimiter)
      .map((num) => parseInt(num, 10))
      .filter((num) => !isNaN(num));

    // check for -ve nums
    const negatives = numberArray.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(", ")}`);
    }

    return numberArray.reduce((sum, num) => sum + num, 0);
  };

  const handleCalculate = () => {
    try {
      setError("");
      setResultValue(calculateSum(inputValue));
    } catch (err) {
      setError(err.message);
      setResultValue(null);
    }
  };

  return (
    <div className="App">
      <h1>Calculate the value of your String</h1>
      <input
        type="text"
        placeholder="Type here..."
        value={inputValue}
        style={{ width: "300px", padding: "10px" }}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        style={{
          padding: "10px 20px",
          marginLeft: "10px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
        onClick={handleCalculate}
      >
        Calculate
      </button>
      <div style={{ marginTop: "20px" }}>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          resultValue !== null && <p>Result: {resultValue}</p>
        )}
      </div>
    </div>
  );
}

export default App;
