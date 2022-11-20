import React from "react";

interface BboxButton {
  activateButton: () => React.SetStateAction<void>;
  displayBbox: boolean;
}
const BboxButton = ({ activateButton, displayBbox }: BboxButton) => {
  return (
    <button onClick={activateButton}>
      {!displayBbox ? "Select Area" : "Cancel"}
    </button>
  );
};

export default BboxButton;
