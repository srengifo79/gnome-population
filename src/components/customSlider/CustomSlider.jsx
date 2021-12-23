import { useState } from "react";
import { Slider } from "@mui/material";
import styled from "styled-components";

import { colors } from "../../theme/colors";

const StyledSlider = styled.div`
  .slider-container {
    text-align: center;

    .MuiSlider-root {
      width 92%; 
      color: ${colors.textBlue};
    }
  }
`;

const CustomSlider = ({ name, range, onSlide }) => {
  const [value, setValue] = useState(range);

  const handleSlide = (e, val) => {
    setValue(val);
    onSlide(val);
  };

  return (
    <StyledSlider>
      <span>{name}</span>
      <div className="slider-container">
        <Slider
          value={value}
          onChange={handleSlide}
          valueLabelDisplay="auto"
          min={range[0]}
          max={range[1]}
        />
      </div>
    </StyledSlider>
  );
};

export default CustomSlider;
