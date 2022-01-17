import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faHome, faCompass, faUser } from '@fortawesome/free-solid-svg-icons'
import {useReactiveVar} from "@apollo/client";
import {isLoggedInVar} from "../../apollo";
import {Link} from "react-router-dom";
import routes from "../../routes_var";
import useUser from "../../hooks/useUser";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.borderColor};
  padding: 18px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Column = styled.div``

const Icon = styled.span`
  margin-left: 15px;
`

const Button = styled.span`
  background-color: ${props => props.theme.accent};
  padding: 5px 15px;
  border-radius: 4px;
  color: white;
  font-weight: 600;
`

const Header = () => {
  
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();
  return (
    <SHeader>
      <Wrapper>
        {isLoggedIn
          ? <>
            <Column>
              <FontAwesomeIcon icon={faInstagram} size="2x"/>
            </Column>
            <Column>
              <Icon><FontAwesomeIcon icon={faHome} size="lg"/></Icon>
              <Icon><FontAwesomeIcon icon={faCompass} size="lg"/></Icon>
              <Icon><FontAwesomeIcon icon={faUser} size="lg"/></Icon>
            </Column>
            </>
          : <Link to={routes.login}><Button>Log in</Button></Link>}
        
      </Wrapper>
    </SHeader>
  );
};

export default Header;
