import React, { useState } from "react";
import { namasteTerminologies, icd11Codes, conceptMappings } 
  from "../../data/terminologyData.js";

export default function TerminologySearch({ onSelect, disabled = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    const filtered = namasteTerminologies.filter(
      (item) =>
        item.display.toLowerCase().includes(value.toLowerCase()) ||
        item.code.toLowerCase().includes(value.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(value.toLowerCase()))
    );
    setResults(filtered);
  };

  const handleSelect = (item) => {
    setQuery(item.display);
    setResults([]);
    if (onSelect) onSelect(item);
  };

  const getMappings = (code) => {
    const mapping = conceptMappings.filter((m) => m.sourceCode === code);
    return mapping
      .map((m) => {
        if (m.targetSystem === "ICD-11-TM2") {
          return icd11Codes.find((c) => c.code === m.targetCode);
        } else if (m.targetSystem === "ICD-11-Biomedicine") {
          return icd11Codes.find((c) => c.code === m.targetCode) || {
            code: m.targetCode,
            display: "Biomedical Code",
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <input
        type="text"
        placeholder={disabled ? "Please wait..." : "Search terminologies..."}
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded mb-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
        disabled={disabled}
      />

      {results.length > 0 && (
        <ul className="border border-gray-200 rounded shadow-md max-h-96 overflow-auto bg-white">
          {results.map((item) => (
            <li
              key={item.code}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(item)}
            >
              <div>
                <span className="font-semibold">{item.display}</span>{" "}
                <span className="text-gray-500 text-sm ml-2">[{item.code}]</span>
              </div>
              {item.description && (
                <div className="text-gray-600 text-sm">{item.description}</div>
              )}
              <div className="mt-1 text-sm">
                {getMappings(item.code).map((m) => (
                  <div key={m.code}>
                    <span className="font-medium">{m.code}</span>: {m.display}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}