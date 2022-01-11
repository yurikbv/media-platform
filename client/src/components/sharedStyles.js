import styled from "styled-components";

export const BaseBox = styled.div`
  background-color: ${props => props.theme.bgBlack};
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 1px;
  width: 100%;
`

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142,142,142);
`

export const SInput = styled.input`
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 1px solid ${props => props.hasError ? 'tomato' : props.theme.borderColor};
  border-radius: 3px;
  margin-top: 5px;
  box-sizing: border-box;
  &:focus {
    border-color: rgb(38,38,38);
  }
`

export const ErrorMessageP = styled.p`
  display: block;
  font-weight: 600;
  margin-top: 5px;
  font-size: 12px;
  color: red;
`