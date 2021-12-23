import { useState } from "react";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";
import { CircularProgress } from "@mui/material";

import { colors } from "../../theme/colors";
import breakpoints from "../../theme/breakpoints";

const StyledListItem = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 8rem;
  padding: 0.3125rem;
  background-color: ${colors.darkBlue};
  color: ${colors.grayWhite};

  .avatar {
    height: 100%;
    flex: 1;
    margin-right: 1em;
    text-align: center;

    ${breakpoints.xlarge} {
      max-width: 19rem;
    }

    ${breakpoints.xxlarge} {
      max-width: 25rem;
    }

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
  border-radius: 0.3em;
  color: ${colors.white};
  background: ${colors.blueGrayGradient};

  .MuiCollapse-wrapper {
    padding: 0.5em;
  }

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

  .list {
    span, li {
      color: ${colors.grayWhite};
    }
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
        <div className="list">
          <h4>Professions: </h4>
          {professions.length > 0 ? (
            <ul>
              {professions.map((prof) => (
                <li key={prof}>{prof}</li>
              ))}
            </ul>
          ) : (
            <span>No known professions</span>
          )}
        </div>
        <div className="list">
          <h4>Friends: </h4>
          {friends.length > 0 ? (
            <ul>
              {friends.map((friend) => (
                <li key={friend}>{friend}</li>
              ))}
            </ul>
          ) : (
            <span>No known friends</span>
          )}
        </div>
      </>
    </Collapse>
  </StyledDropdowBox>
);

const Header = ({ id, age, name, height, weight, thumbnail, onClick }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  return (
    <StyledListItem onClick={onClick} data-testid="listItemContainer">
      {thumbnail && (
        <div className="avatar">
          {isLoadingImg && <CircularProgress />}
          <img
            src={thumbnail}
            alt="gnome avatar"
            onLoad={() => setIsLoadingImg(false)}
          />
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
};

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
