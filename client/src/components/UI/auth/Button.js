import React from 'react';
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 3px;
  box-sizing: border-box;
  margin-top: 12px;
  background-color: ${props => props.theme.accent};
  color: white;
  text-align: center;
  cursor: ${props => props.disabled ? "default" : "pointer"};
  font-weight: 500;
  opacity: ${props => props.disabled ? "0.2" : "1"};
`

export default Button;
