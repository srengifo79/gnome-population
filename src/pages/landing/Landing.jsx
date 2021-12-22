import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import { getGnomePopulation } from "../../api/gnomePopulation";
import ListItem from "../../components/listItem/ListItem";
import { useState, useEffect } from "react";

const StyledLanding = styled.div`
  .loading-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;

const Landing = () => {
  const [pagination, setPagination] = useState(10);
  const { isLoading, error, data } = useQuery("gnomesData", getGnomePopulation);

  const items = data?.Brastlewark;

  const handleScroll = (e) => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      setPagination((prev) => prev + 10);
    }
  };

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
      {isLoading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {!error &&
        data &&
        items
          .slice(0, pagination)
          .map((item, index) => (
            <ListItem {...item} key={index} collapsable={true} />
          ))}
    </StyledLanding>
  );
};

export default Landing;
