import { useEffect, useState } from "react";

function useLocalStroge(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );
  return [value, setValue];
}

export default useLocalStroge;
