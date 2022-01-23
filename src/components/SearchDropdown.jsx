import React, { useState } from "react";
import "../css/Dropdown.css";

export default function SearchDropdown(
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
            <div className="dropdown-search">
              <input
                type="text"
                placeholder="Type to search..."
                onChange={(event) => {
                  setDropdownOptions(
                    optionsList.filter((option) =>
                      option
                        .toLowerCase()
                        .includes(event.target.value.toLowerCase())
                    )
                  );
                }}
                autoComplete="off"
              />
            </div>

            {dropdownOptions.map((option) => {
              return (
                <div
                  className="dropdown-option"
                  key={option}
                  type="button"
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
