import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [fullSequence, setFullSequence] = useState([]);

  const handleAddNumber = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 36) return;

    setFullSequence((prev) => [...prev, num]);

    setHistory((prev) => {
      if (prev.includes(num)) return prev; // Neatnaujina, jei jau buvo
      const updated = [...prev, num];
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

  // Papildoma funkcija: skaičiai, kurie buvo prieš daugiau nei 50 įrašų
  const olderThan50 = () => {
    const thresholdIndex = fullSequence.length - 50;
    if (thresholdIndex <= 0) return [];

    const seen = new Set(fullSequence.slice(thresholdIndex));
    const result = {};
    for (let i = 0; i < thresholdIndex; i++) {
      const num = fullSequence[i];
      if (!seen.has(num)) {
        result[num] = (result[num] || 0) + 1;
      }
    }
    return Object.entries(result);
  };

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
        <h4>Seniausi 18 skaičių (unikalūs, senėjimo tvarka):</h4>
        <div>{latest18.join(", ")}</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>12 pačių seniausių iš tų 18:</h4>
        <div>{oldest12.join(", ")}</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Skaičiai, kurie iškrito seniau nei prieš 50 įrašų:</h4>
        <ul>
          {olderThan50().map(([num, count]) => (
            <li key={num}>Skaičius {num} iškrito {count} kartą(-us)</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
