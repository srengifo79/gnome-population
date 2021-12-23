import { useState } from "react";
import { Checkbox, Drawer, Slider } from "@mui/material";
import styled from "styled-components";

import FilterListIcon from "@mui/icons-material/FilterList";

import { colors } from "../../theme/colors";
import CustomSlider from "../customSlider/CustomSlider";

const StyledFilterIcon = styled.div`
  padding: 0.4rem 0.5rem;
  position: fixed;
  top: 3rem;
  right: 0rem;
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
`;

const StyledContent = styled.div`
  padding: 0.2rem;
  background-color: ${colors.backgroundBlue};

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
    }
  }
`;

const Filters = ({
  professions,
  hairColors,
  ageRange,
  heightRange,
  weightRange,
  onFilter,
  expandable,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [professionFilter, setProfessionFilter] = useState([]);
  const [hairColorsFilter, setHairColorsFilter] = useState([]);

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

  return (
    <>
      {expandable ? (
        <>
          <StyledFilterIcon onClick={() => setIsExpanded((prev) => !prev)}>
            <FilterListIcon />
          </StyledFilterIcon>
          <StyledDrawer
            anchor="right"
            open={isExpanded}
            onClose={() => setIsExpanded((prev) => !prev)}
          >
            <StyledContent>
              <div className="filters-container">
                <h5>Age, Height, Weight</h5>
                <div className="filters-content">
                  <CustomSlider
                    name="age"
                    range={ageRange}
                    onSlide={(val) => onFilter(val, "ageFilter")}
                  />
                  <CustomSlider
                    name="Height"
                    range={heightRange}
                    onSlide={(val) => onFilter(val, "heightFilter")}
                  />
                  <CustomSlider
                    name="Weight"
                    range={weightRange}
                    onSlide={(val) => onFilter(val, "weightFilter")}
                  />
                </div>
              </div>
              <div className="filters-container">
                <h5>Professions</h5>
                <div className="filters-content">
                  {professions.sort().map((prof) => (
                    <div key={prof}>
                      <Checkbox
                        data-testid="profCheckbox"
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
            </StyledContent>
          </StyledDrawer>
        </>
      ) : (
        <StyledContent>
          <div className="filters-container">
            <h5>Age, Height, Weight</h5>
            <div className="filters-content">
              <CustomSlider
                name="age"
                range={ageRange}
                onSlide={(val) => onFilter(val, "ageFilter")}
              />
              <CustomSlider
                name="Height"
                range={heightRange}
                onSlide={(val) => onFilter(val, "heightFilter")}
              />
              <CustomSlider
                name="Weight"
                range={weightRange}
                onSlide={(val) => onFilter(val, "weightFilter")}
              />
            </div>
          </div>
          <div className="filters-container">
            <h5>Professions</h5>
            <div className="filters-content">
              {professions.sort().map((prof) => (
                <div key={prof}>
                  <Checkbox
                    data-testid="profCheckbox"
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
        </StyledContent>
      )}
    </>
  );
};

export default Filters;
