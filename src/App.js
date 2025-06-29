import React, { useState } from "react";

const ALL_NUMBERS = Array.from({ length: 37 }, (_, i) => i);

function App() {
  const [input, setInput] = useState("");
  const [sequence, setSequence] = useState([]); // Visų įvestų skaičių seka
  const [uniqueAgingList, setUniqueAgingList] = useState([]); // 18 seniausių unikalių skaičių

  const handleAddNumber = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 36) return;

    setSequence((prev) => [...prev, num]);

    setUniqueAgingList((prev) => {
      const filtered = prev.filter((n) => n !== num); // Išimti jei buvo anksčiau
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

  const oldest12 = uniqueAgingList.slice(0, 12);

  // Apskaičiuoti skaičius, kurie nebuvo tarp paskutinių 50
  const missingFromLast50 = () => {
    const last50 = sequence.slice(-50);
    const set50 = new Set(last50);
    return ALL_NUMBERS.filter((num) => !set50.has(num));
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
        <div>{uniqueAgingList.join(", ")}</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>12 pačių seniausių iš tų 18:</h4>
        <div>{oldest12.join(", ")}</div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h4>Skaičiai, kurie nebuvo tarp paskutinių 50 įrašų:</h4>
        <ul>
          {missingFromLast50().map((num) => (
            <li key={num}>Skaičius {num}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
