import { useEffect, useState } from "react";
import { Checkbox, Drawer, Slider } from "@mui/material";
import styled from "styled-components";

import FilterListIcon from "@mui/icons-material/FilterList";

import { colors } from "../../theme/colors";

const StyledFilterIcon = styled.div`
  padding: 0.4rem 0.5rem;
  position: fixed;
  top: 3rem;
  right: -1rem;
  border-radius: 50%;
  background-color: ${colors.whiteBlueBlur};
  color: ${colors.paleBLue};
  box-shadow: 0px 0px 10px ${colors.paleBLue};
`;

const StyledDrawer = styled(Drawer)`
  .MuiPaper-root {
    padding: 0.2rem;
    background-color: ${colors.backgroundBlue};
  }

  .filters-container {
    min-width: 15rem;

    h5 {
      padding: 0.5em;
      color: ${colors.white};
      background-color: ${colors.grayDark};
      margin: unset;
    }

    .filters-content {
      padding: 0.5rem;
      color: ${colors.white};
      border: 1px solid ${colors.grayDark};

      .MuiCheckbox-root {
        color: ${colors.textBlue};
      }

      .slider-container {
        text-align: center;
        
        .MuiSlider-root {
          width 92%
        }
      }
    }
  }
`;

const Filters = ({
  professions,
  hairColors,
  ageRange,
  heightRange,
  onFilter,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [professionFilter, setProfessionFilter] = useState([]);
  const [hairColorsFilter, setHairColorsFilter] = useState([]);
  const [ageFilter, setAgeFilter] = useState(ageRange);
  const [heightFilter, setHeightFilter] = useState(heightRange);

  const checkboxChange = (newFilter, filterList) => {
    let filteredItems = filterList;
    if (filterList.includes(newFilter)) {
      filteredItems = filterList.filter(
        (elem, index) => index !== filterList.indexOf(newFilter)
      );
    } else {
      filteredItems.push(newFilter);
    }

    return filteredItems;
  };

  const checkboxFilterChange = (values, setState, filterName, filterList) => {
    const newFilter = checkboxChange(values, filterList);
    setState(newFilter);
    onFilter(newFilter, filterName);
  };

  const rangeFilterChange = (val, setState, filterName) => {
    setState(val);
    onFilter(val, filterName);
  };

  return (
    <>
      <StyledFilterIcon onClick={() => setIsExpanded((prev) => !prev)}>
        <FilterListIcon />
      </StyledFilterIcon>
      <StyledDrawer
        anchor="right"
        open={isExpanded}
        onClose={() => setIsExpanded((prev) => !prev)}
      >
        <div className="filters-container">
          <h5>Age, Height, Weight</h5>
          <div className="filters-content">
            <span>Age</span>
            <div className="slider-container">
              <Slider
                value={ageFilter}
                onChange={(e, val) =>
                  rangeFilterChange(val, setAgeFilter, "ageFilter")
                }
                valueLabelDisplay="auto"
                min={ageRange[0]}
                max={ageRange[1]}
              />
            </div>
            <span>Height</span>
            <div className="slider-container">
              <Slider
                value={heightFilter}
                onChange={(e, val) =>
                  rangeFilterChange(val, setHeightFilter, "heightFilter")
                }
                valueLabelDisplay="auto"
                min={heightRange[0]}
                max={heightRange[1]}
              />
            </div>
          </div>
        </div>
        <div className="filters-container">
          <h5>Professions</h5>
          <div className="filters-content">
            {professions.sort().map((prof) => (
              <div key={prof}>
                <Checkbox
                  checked={professionFilter.includes(prof)}
                  onChange={() =>
                    checkboxFilterChange(
                      prof,
                      setProfessionFilter,
                      "professions",
                      professionFilter
                    )
                  }
                />
                <span>{prof}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="filters-container">
          <h5>Hair Colors</h5>
          <div className="filters-content">
            {hairColors.sort().map((color) => (
              <div key={color}>
                <Checkbox
                  checked={hairColorsFilter.includes(color)}
                  onChange={() =>
                    checkboxFilterChange(
                      color,
                      setHairColorsFilter,
                      "hairColors",
                      hairColorsFilter
                    )
                  }
                />
                <span>{color}</span>
              </div>
            ))}
          </div>
        </div>
      </StyledDrawer>
    </>
  );
};

export default Filters;
