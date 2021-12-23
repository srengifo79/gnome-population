import { useState, useEffect, useMemo, useRef } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

import { getGnomePopulation } from "../../api/gnomePopulation";
import ListItem from "../../components/listItem/ListItem";
import Filters from "../../components/filters/Filters";
import { colors } from "../../theme/colors";
import { MenuItem, Select } from "@mui/material";

const StyledLanding = styled.div`
  .loading-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  header {
    padding: 0.2rem 0.3125rem;
    display: flex;

    .city-select {
      margin-right: 0.5rem;
      color: ${colors.white};
      background-color: ${colors.paleBLue};
      outline: none;
      border: 1px solid ${colors.black};
      border-radius: 0.2em;

      .MuiSelect-select {
        padding-top: 0.5em;
        padding-bottom: 0.5em;
      }
    }

    .search-bar {
      flex: 1;
    }
  }
`;

const Landing = () => {
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedCityItems, setSelectedCityItems] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [pagination, setPagination] = useState(10);

  const currentFilters = useRef({
    professions: [],
    search: "",
    hairColors: [],
    ageFilter: [0, 0],
    heightFilter: [0, 0],
    weightFilter: [0, 0],
  });

  const { isLoading, error, data } = useQuery("gnomesData", getGnomePopulation);

  const dataKeys = (!error && data && Object.keys(data)) || [];

  const handleFilterChange = (values, filter) => {
    currentFilters.current[filter] = values;
    applyFilters();
  };

  const minMaxRange = (curr, min, max) => {
    let result = [min, max];

    if (curr < min) {
      result[0] = curr;
    }
    if (curr > max) {
      result[1] = curr;
    }

    return result;
  };

  const applyFilters = () => {
    const {
      search,
      professions,
      hairColors,
      ageFilter,
      heightFilter,
      weightFilter,
    } = currentFilters.current;
    let itemsAppliedFilters = selectedCityItems;

    //Search filter
    if (!!search) {
      itemsAppliedFilters = itemsAppliedFilters.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    //Professions filter
    if (professions.length > 0) {
      itemsAppliedFilters = itemsAppliedFilters.filter((item) =>
        item.professions.some((prof) => professions.includes(prof))
      );
    }

    //Hair colors filter
    if (hairColors.length > 0) {
      itemsAppliedFilters = itemsAppliedFilters.filter((item) =>
        hairColors.includes(item.hair_color)
      );
    }

    //Age filter
    itemsAppliedFilters = itemsAppliedFilters.filter(
      (item) => item.age >= ageFilter[0] && item.age <= ageFilter[1]
    );

    //Height filter
    itemsAppliedFilters = itemsAppliedFilters.filter(
      (item) => item.height >= heightFilter[0] && item.height <= heightFilter[1]
    );

    //Weight filter
    itemsAppliedFilters = itemsAppliedFilters.filter(
      (item) => item.weight >= weightFilter[0] && item.weight <= weightFilter[1]
    );

    setListItems(itemsAppliedFilters);
  };

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      setPagination((prev) => prev + 10);
    }
  };

  const handleCitySelect = (value) => {
    const newCity = data[value];
    setSelectedCityItems(newCity);
    setListItems(newCity);
    setSelectedCityName(value);
  };

  const filtersData = useMemo(() => {
    const professions = new Set();
    const hairColors = new Set();
    let ageRange = [Infinity, 0];
    let heightRange = [Infinity, 0];
    let weightRange = [Infinity, 0];

    selectedCityItems.forEach((item) => {
      hairColors.add(item.hair_color);
      item.professions.forEach(professions.add, professions);

      ageRange = minMaxRange(item.age, ageRange[0], ageRange[1]);
      heightRange = minMaxRange(item.height, heightRange[0], heightRange[1]);
      weightRange = minMaxRange(item.weight, weightRange[0], weightRange[1]);

      currentFilters.current.ageFilter = ageRange;
      currentFilters.current.heightFilter = heightRange;
      currentFilters.current.weightFilter = weightRange;
    });

    return {
      professions: Array.from(professions),
      hairColors: Array.from(hairColors),
      ageRange,
      heightRange,
      weightRange,
    };
  }, [selectedCityItems]);

  useEffect(() => {
    if (!error && data && dataKeys.length > 0) {
      const firstCity = data[dataKeys[0]];
      setSelectedCityItems(firstCity);
      setListItems(firstCity);
      setSelectedCityName(dataKeys[0]);
    }
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
      <header>
        <Select
          name="city"
          id="city"
          className="city-select"
          value={selectedCityName}
          onChange={(e) => {
            handleCitySelect(e.target.value);
          }}
        >
          {!error &&
            data &&
            dataKeys.map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
        </Select>
        <SearchBar
          onSearch={(val) => handleFilterChange(val, "search")}
          className="search-bar"
        />
      </header>
      {isLoading && (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
      {listItems.slice(0, pagination).map((item) => (
        <ListItem {...item} key={item.id} collapsable={true} />
      ))}
      <Filters {...filtersData} onFilter={handleFilterChange} />
    </StyledLanding>
  );
};

export default Landing;
