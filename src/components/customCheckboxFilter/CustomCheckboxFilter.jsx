import { Checkbox } from "@mui/material";
import { useRef } from "react";
import styled from "styled-components";

import { colors } from "../../theme/colors";

const StyledCustomCheckboxFilter = styled.div`
  .filters-content {
    .MuiCheckbox-root {
      color: ${colors.textBlue};
    }
  }
`;

const CustomCheckboxFilter = ({ name, filterList, onCheck }) => {
  const checkedItems = useRef([]);

  const handleCheck = (checked, itemName) => {
    const currCheckedItems = checkedItems.current;

    if (checked) {
      currCheckedItems.push(itemName);
    } else {
      const indexOfName = currCheckedItems.indexOf(itemName);
      currCheckedItems.splice(indexOfName, 1);
    }

    onCheck(currCheckedItems);
  };

  return (
    <StyledCustomCheckboxFilter>
      <h5>{name}</h5>
      <div className="filters-content">
        {filterList.sort().map((prof) => (
          <div key={prof}>
            <Checkbox
              name={prof}
              data-testid="checkboxes"
              onChange={(e) => {
                handleCheck(e.target.checked, e.target.name);
              }}
            />
            <span>{prof}</span>
          </div>
        ))}
      </div>
    </StyledCustomCheckboxFilter>
  );
};

export default CustomCheckboxFilter;
