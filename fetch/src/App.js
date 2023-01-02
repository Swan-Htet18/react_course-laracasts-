import { useState } from "react";
import "./App.css";
import Reddit from "./components/Reddit";
import Joke from "./components/Joke";

function App() {
  const [redditVisible, setRedditVisible] = useState(false);
  const [jokeVisible, setJokeVisible] = useState(false);
  return (
    <div>
      <div className="buttons">
        <button
          onClick={() =>
            setRedditVisible((prevRedditVisible) => !prevRedditVisible)
          }
        >
          Toggle Reddit
        </button>
        <button
          onClick={() => setJokeVisible((prevJokeVisible) => !prevJokeVisible)}
        >
          Toggle Joke
        </button>
        {redditVisible && <Reddit />}
        {jokeVisible && <Joke />}
      </div>
    </div>
  );
}

export default App;
