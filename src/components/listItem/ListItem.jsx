import { useState } from "react";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";

import { colors } from "../../theme/colors";

const StyledListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 8rem;
  padding: 0.3125rem;
  background-color: ${colors.darkBlue};
  color: ${colors.grayWhite};

  .avatar {
    height: 100%;
    flex: 1;
    margin-right: 2em;

    img {
      max-height: 100%;
      width: 100%;
    }
  }

  .info-container {
    flex: 2;

    span {
      display: block;
    }

    .header {
      margin-bottom: 1em;

      h3 {
        color: ${colors.white};
        margin: unset;
      }

      span {
        font-size: 0.875em;
      }
    }

    .general-data {
      span {
        margin-bottom: 0.3em;
      }
    }
  }
`;

const StyledDropdowBox = styled.div`
  margin: 0 0.5rem;
  padding: ${({ isExpanded }) => (isExpanded ? "0.5em" : "unset")};
  border-radius: 0.3em;
  color: ${colors.white};
  background: linear-gradient(
    -60deg,
    rgba(226, 244, 255, 0.3) 5%,
    rgba(84, 107, 115, 0.3) 95%
  );

  .hair-color {
    h4 {
      display: inline;
      margin: unset;
      margin-right: 1em;
    }

    span {
      color: ${colors.grayWhite};
    }
  }

  .professions {
    li {
      color: ${colors.grayWhite};
    }
  }

  .friends {
    span {
      color: ${colors.grayWhite};
    }
  }
`;

const DropdowBox = ({ isExpanded, hair_color, professions, friends }) => (
  <StyledDropdowBox isExpanded={isExpanded}>
    <Collapse in={isExpanded}>
      <>
        <div className="hair-color card">
          <h4>Hair Color:</h4>
          <span>{hair_color}</span>
        </div>
        <div className="professions">
          <h4>Professions: </h4>
          <ul>
            {professions.map((prof) => (
              <li key={prof}>{prof}</li>
            ))}
          </ul>
        </div>
        <div className="friends">
          <h4>Friends: </h4>
          {friends.map((friend) => (
            <span>{friend}</span>
          ))}
        </div>
      </>
    </Collapse>
  </StyledDropdowBox>
);

const Header = ({ id, age, name, height, weight, thumbnail, onClick }) => (
  <StyledListItem onClick={onClick}>
    {thumbnail && (
      <div className="avatar">
        <img src={thumbnail} alt="gnome avatar" />
      </div>
    )}
    <div className="info-container">
      <div className="header">
        <h3>{name}</h3>
        <span>ID: {id}</span>
      </div>
      <div className="general-data">
        <span>Age: {age}</span>
        <span>Height: {height}</span>
        <span>Weight: {weight}</span>
      </div>
    </div>
  </StyledListItem>
);

const ListItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Header {...props} onClick={handleToggle} />
      {props.collapsable && <DropdowBox {...props} isExpanded={isExpanded} />}
    </>
  );
};

export default ListItem;
