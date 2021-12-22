import { useState, useEffect } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import { getGnomePopulation } from "../../api/gnomePopulation";
import ListItem from "../../components/listItem/ListItem";

const StyledLanding = styled.div`
  .loading-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const Landing = () => {
  const [listItems, setListItems] = useState([]);
  const [pagination, setPagination] = useState(10);

  const { isLoading, error, data } = useQuery("gnomesData", getGnomePopulation);

  const handleSearch = (searchValue) => {
    if (!!searchValue) {
      setListItems((prev) =>
        prev.filter((item) =>
          item.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setListItems(data.Brastlewark);
    }
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      setPagination((prev) => prev + 10);
    }
  };

  useEffect(() => {
    !error && data && setListItems(data.Brastlewark);
  }, [data, error]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StyledLanding>
      <SearchBar onSearch={handleSearch} />
      {isLoading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {listItems.slice(0, pagination).map((item) => (
        <ListItem {...item} key={item.id} collapsable={true} />
      ))}
    </StyledLanding>
  );
};

export default Landing;
