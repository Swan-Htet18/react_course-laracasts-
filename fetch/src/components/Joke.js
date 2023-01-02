import React from "react";
// import useFetch from "./newFetch";
import { useQuery } from "react-query";

export default function Reddit() {
  //   const {
  //     data: joke,
  //     isLoading,
  //     errorMessage,
  //   } = useFetch("https://official-joke-api.appspot.com/jokes/random");
  const {
    data: joke,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery("joke", fetchJoke, {
    // staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  function fetchJoke() {
    return fetch("https://official-joke-api.appspot.com/jokes/randomx").then(
      (response) => response.json()
    );
  }

  return (
    <div>
      <h2>Joke API</h2>
      {isLoading && <div>Loading...</div>}
      {isSuccess && <div>{joke.setup + " " + joke.punchline}</div>}
      {isError && <div>{error.message}</div>}
    </div>
  );
}
