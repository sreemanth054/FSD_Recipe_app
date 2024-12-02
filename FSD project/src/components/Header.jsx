import React from "react";

const Header = ({ onSearchPage, setCurrentPage }) => {
  return (
    <header>
      <h1>Meal Book</h1>
      <nav>
        <button 
          onClick={() => {
            setCurrentPage("search");
            onSearchPage();
          }}
        >
          Home
        </button>
        <button 
          className="save" 
          onClick={() => setCurrentPage("saved")}
        >
          Saved
        </button>
      </nav>
    </header>
  );
};

export default Header;
