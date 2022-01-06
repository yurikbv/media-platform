import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import FormBox from "../UI/auth/FormBox";
import Input from "../UI/auth/Input";
import Button from "../UI/auth/Button";
import BottomBox from "../UI/auth/BottomBox";
import routes from "../../routes_var";
import AuthLayout from "../Layouts/AuthLayout";
import styled from "styled-components";
import {FatLink} from "../sharedStyles";
import PageTitle from "../UI/PageTitle";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`

const SignUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x"/>
          <SubTitle >Sign up to see photos or videos from your friends.</SubTitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="Email"/>
          <Input type="text" placeholder="Name"/>
          <Input type="text" placeholder="Username"/>
          <Input type="password" placeholder="Password"/>
          <Button text="Sign up"/>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.login} />
    </AuthLayout>
  );
};

export default SignUp;
