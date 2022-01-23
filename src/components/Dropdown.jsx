import React, { useState } from "react";
import "../css/Dropdown.css";

export default function Dropdown(
  optionsList,
  selectedOption,
  setSelectedOption,
  message
) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);

  function dropdownMenu() {
    return (
      <div className="dropdown-menu">
        <div
          className="dropdown-selector"
          onClick={() => {
            setShowDropdown(!showDropdown);
            setDropdownOptions(optionsList);
          }}
        >
          {message}: {selectedOption}
        </div>

        {showDropdown && (
          <div className="dropdown-list">
            {dropdownOptions.map((option) => {
              return (
                <div
                  type="button"
                  className="dropdown-option"
                  key={option}
                  onClick={() => {
                    setSelectedOption(option);
                    setShowDropdown(false);
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return {
    dropdownMenu,
  };
}
