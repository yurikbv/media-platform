import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 1px;
  width: 100%;
`


const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`

const Input = styled.input`
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 3px;
  margin-top: 5px;
  box-sizing: border-box;
`

const Button = styled.button(Input)`
  margin-top: 12px;
  background-color: ${props => props.theme.accent};
  color: white;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
`

const BottomBox = styled(WhiteBox)`
  padding: 20px 0;
  text-align: center;
  a {
    font-weight: 600;
    color: ${props => props.theme.accent};
    margin-left: 5px;
  }
`

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`

const Separator = styled.div`
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

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div><FontAwesomeIcon icon={faInstagram} size="3x"/></div>
          <form>
            <Input type="text" placeholder="Username"/>
            <Input type="password" placeholder="Password"/>
            <Button type="submit">Log in</Button>
          </form>
          <Separator>
            <div/>
            <span>Or</span>
            <div/>
          </Separator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>
            Don't have an account?
          </span>
          <Link to="/signup">Sign up</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
