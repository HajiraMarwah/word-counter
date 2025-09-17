import React, { useState } from "react";

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
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-3">Word Frequency Counter</h2>
      <textarea
        data-testid="textarea"
        className="w-full p-2 border rounded-md mb-4"
        rows="6"
        placeholder="Type or paste text here..."
        onChange={handleTextChange}
      />
      <ul data-testid="result-list" className="list-disc pl-5">
        {wordCounts.map(([word, count]) => (
          <li key={word} data-testid={`word-${word}`}>
            {word} count: {count}
          </li>
        ))}
      </ul>
    </div>
  );
}
