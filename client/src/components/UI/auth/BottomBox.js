import React from 'react';
import styled from "styled-components";
import {BaseBox} from "../../sharedStyles";
import {Link} from "react-router-dom";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0;
  text-align: center;
  a {
    font-weight: 600;
    color: ${props => props.theme.accent};
    margin-left: 5px;
  }
`

const BottomBox = ({cta, link, linkText}) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

export default BottomBox;
