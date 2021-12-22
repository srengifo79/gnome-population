import { useState } from "react";
import styled from "styled-components";

import { colors } from "../../theme/colors";

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: space-between;

  input {
    flex: 1;
    padding: 0.5em;
    color: ${colors.white};
    background-color: ${colors.paleBLue};
    outline: none;
    border: 1px solid ${colors.black};
    border-radius: 0.2em;
    margin-right: 0.5rem;

    &::placeholder {
      color: ${colors.white};
    }
  }

  button {
    color: ${colors.textBlue};
    padding: 0.6em 1em;
    border-radius: 2px;
    background: ${colors.paleBLue};
    border: 1px solid ${colors.black};
  }
`;
const SearchBar = ({ onSearch, className }) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <StyledSearchBar className={className}>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by name"
      />
      <button onClick={() => onSearch(searchValue)}>Search</button>
    </StyledSearchBar>
  );
};

export default SearchBar;
