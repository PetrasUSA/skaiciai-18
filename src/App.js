import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const handleAddNumber = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 36) return;

    setHistory((prev) => {
      const filtered = prev.filter((n) => n !== num);
      const updated = [...filtered, num];
      return updated.length > 18 ? updated.slice(updated.length - 18) : updated;
    });
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNumber();
    }
  };

  const latest18 = history;
  const oldest12 = history.slice(0, 12);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🎯 Skaičių Sekimo Programėlė</h2>
      <input
        type="number"
        placeholder="Įvesk skaičių (0–36)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleAddNumber}>Next</button>

      <div style={{ marginTop: "20px" }}>
        <h4>Naujausi 18 skaičių:</h4>
        <div>{latest18.join(", ")}</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>12 seniausių iš paskutinių 18:</h4>
        <div>{oldest12.join(", ")}</div>
      </div>
    </div>
  );
}

export default App;
