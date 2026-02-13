import { useState } from "react";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(12);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [dark, setDark] = useState(false);

  const generatePassword = () => {
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}<>?";

    let allChars = "";
    let result = [];

    if (lower) {
      result.push(lowerChars[Math.floor(Math.random() * lowerChars.length)]);
      allChars += lowerChars;
    }
    if (upper) {
      result.push(upperChars[Math.floor(Math.random() * upperChars.length)]);
      allChars += upperChars;
    }
    if (numbers) {
      result.push(numberChars[Math.floor(Math.random() * numberChars.length)]);
      allChars += numberChars;
    }
    if (symbols) {
      result.push(symbolChars[Math.floor(Math.random() * symbolChars.length)]);
      allChars += symbolChars;
    }

    if (!allChars || length < result.length) return;

    for (let i = result.length; i < length; i++) {
      result.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    result.sort(() => Math.random() - 0.5);
    setPassword(result.join(""));
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Mot de passe copié !");
  };

  return (
    <div className={`page ${dark ? "dark" : ""}`}>
      <div className="box">
        <div className="top">
          <h2>Password Generator</h2>
          <button className="mode" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="field">
          <label>Length</label>
          <input type="number"min="4" max="64" value={length}
            onChange={(e) => setLength(Number(e.target.value))}/>
        </div>

        <div className="options">
          <label><input type="checkbox" checked={lower} onChange={() => setLower(!lower)} /> Lowercase</label>
          <label><input type="checkbox" checked={upper} onChange={() => setUpper(!upper)} /> Uppercase</label>
          <label><input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} /> Numbers</label>
          <label><input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} /> Symbols</label>
        </div>

        <button onClick={generatePassword}>Generate</button>

        {password && (
          <div className="result">
            <input type="text" value={password} readOnly />
            <button className="copy" onClick={copyPassword}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
}
