import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "https://serpapi-backend-hst6.onrender.com/search";

  
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchResults();
    }, 500); 

    return () => clearTimeout(timer);
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await fetch(`${API_URL}?q=${query}`);
      const data = await res.json();

      if (data.organic_results) {
        setResults(data.organic_results);
      } else {
        setError("No results found ");
      }
    } catch (err) {
      setError("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🔍 Google Search Clone</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchResults}>Search</button>
      </div>

      {loading && <p className="info">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="results">
        {results.map((item, idx) => (
          <div className="card" key={idx}>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </a>
            <p className="link">{item.displayed_link}</p>
            <p className="snippet">{item.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
