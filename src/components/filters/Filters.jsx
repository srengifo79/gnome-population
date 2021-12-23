import { useState } from "react";
import { Drawer } from "@mui/material";
import styled from "styled-components";

import FilterListIcon from "@mui/icons-material/FilterList";

import { colors } from "../../theme/colors";
import CustomSlider from "../customSlider/CustomSlider";
import CustomCheckboxFilter from "../customCheckboxFilter/CustomCheckboxFilter";

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
                <CustomCheckboxFilter
                  name="Professions"
                  filterList={professions}
                  onCheck={(val) => onFilter(val, "professions")}
                />
              </div>
              <div className="filters-container">
                <CustomCheckboxFilter
                  name="Hair Colors"
                  filterList={hairColors}
                  onCheck={(val) => onFilter(val, "hairColors")}
                />
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
            <CustomCheckboxFilter
              name="Professions"
              filterList={professions}
              onCheck={(val) => onFilter(val, "professions")}
            />
          </div>
          <div className="filters-container">
            <CustomCheckboxFilter
              name="Hair Colors"
              filterList={hairColors}
              onCheck={(val) => onFilter(val, "hairColors")}
            />
          </div>
        </StyledContent>
      )}
    </>
  );
};

export default Filters;
