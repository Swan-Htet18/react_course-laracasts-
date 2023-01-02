import React from "react";
function useToggle(initialState = true) {
  const [visible, setVisible] = React.useState(initialState);

  function toggle() {
    setVisible((prevVisible) => !prevVisible);
  }

  return [visible, toggle];
}

export default useToggle;
