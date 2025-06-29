import React, { useState } from "react";

const ALL_NUMBERS = Array.from({ length: 37 }, (_, i) => i);

function App() {
  const [input, setInput] = useState("");
  const [sequence, setSequence] = useState([]);
  const [lastSeen, setLastSeen] = useState({});

  const handleAddNumber = () => {
    const num = parseInt(input);
    if (isNaN(num) || num < 0 || num > 36) return;

    setSequence((prevSeq) => {
      const newSeq = [...prevSeq, num];
      const updatedLastSeen = { ...lastSeen, [num]: newSeq.length - 1 };
      setLastSeen(updatedLastSeen);
      return newSeq;
    });

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddNumber();
    }
  };

  // Seniausi 18 skaičių
  const getOldest18 = () => {
    const neverSeen = ALL_NUMBERS.filter((n) => !(n in lastSeen));
    const seen = ALL_NUMBERS.filter((n) => n in lastSeen)
      .sort((a, b) => lastSeen[a] - lastSeen[b]);
    return [...neverSeen, ...seen].slice(0, 18);
  };

  // 12 pačių seniausių iš jų
  const getOldest12 = () => getOldest18().slice(0, 12);

  // Skaičiai, kurių nebuvo tarp paskutinių 50
  const getMissingFromLast50 = () => {
    const last50 = sequence.slice(-50);
    const set50 = new Set(last50);
    return ALL_NUMBERS.filter((n) => !set50.has(n));
  };

  return (
    <div style={{ fontSize: "140%", padding: "20px", fontFamily: "Arial" }}>
      <h2>Skaičių Sekimo Programėlė</h2>

      <input
        type="number"
        min="0"
        max="36"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ fontSize: "1em", padding: "5px", width: "60px" }}
      />
      <button onClick={handleAddNumber} style={{ fontSize: "1em", marginLeft: "10px" }}>
        Įvesti
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Seniausi 18 skaičių:</h3>
        <p>{getOldest18().join(", ")}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>12 pačių seniausių:</h3>
        <p>{getOldest12().join(", ")}</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Skaičiai, kurių nebuvo tarp paskutinių 50:</h3>
        <p>{getMissingFromLast50().join(", ")}</p>
      </div>
    </div>
  );
}

export default App;
