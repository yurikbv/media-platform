import React from 'react';
import styled from "styled-components";

const SSeparator = styled.div`
  margin: 20px 0 30px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    width: 100%;
    height: 1px;
    background-color: ${props => props.theme.borderColor};
  }
  span {
    margin: 0 5px;
    color: #8e8e8e;
    font-weight: 600;
  }
`

const Separator = ({text}) => {
  return (
    <SSeparator>
      <div/>
      <span>{text}</span>
      <div/>
    </SSeparator>
  );
};

export default Separator;
