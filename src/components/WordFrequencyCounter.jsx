import React, { useState } from "react";
import "./WordFrequencyCounter.css";

export default function WordFrequencyCounter() {
  const [wordCounts, setWordCounts] = useState([]);

  const handleTextChange = (e) => {
    const text = e.target.value;

    // Clean text: remove punctuation, numbers, symbols, and lowercase everything
    const cleanedText = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ") // keep only letters and spaces
      .replace(/\s+/g, " ") // remove extra spaces
      .trim();

    // Split into words
    const words = cleanedText.length > 0 ? cleanedText.split(" ") : [];

    // Count occurrences
    const countMap = {};
    words.forEach((word) => {
      if (word) {
        countMap[word] = (countMap[word] || 0) + 1;
      }
    });

    // Convert to array and sort by frequency
    const sortedCounts = Object.entries(countMap).sort(
      (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
    );

    setWordCounts(sortedCounts);
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Word Frequency Counter</h2>
        <textarea
          data-testid="textarea"
          className="textarea"
          rows="6"
          placeholder="Type or paste text here..."
          onChange={handleTextChange}
        />
        <ul data-testid="result-list" className="result-list">
          {wordCounts.map(([word, count]) => (
            <li key={word} data-testid={`word-${word}`} className="result-item">
              {word} count: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
