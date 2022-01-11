import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import FormBox from "../UI/auth/FormBox";
import Button from "../UI/auth/Button";
import BottomBox from "../UI/auth/BottomBox";
import routes from "../../routes_var";
import AuthLayout from "../Layouts/AuthLayout";
import styled from "styled-components";
import {ErrorMessageP, FatLink, SInput} from "../sharedStyles";
import PageTitle from "../UI/PageTitle";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {gql, useMutation} from "@apollo/client";

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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName:  String!
    $lastName:  String
    $username:  String!
    $email:  String!
    $password:  String!
  ) {
    createAccount(
      firstName:$firstName
      lastName:$lastName
      username:$username
      email:$email
      password:$password
    ) {
      ok
      error
    }
  }
`

const SignUp = () => {
  
  let navigate = useNavigate();
  
  const {register, handleSubmit, formState: { errors, isValid}, setError, getValues } = useForm(
    {criteriaMode: "all", mode: "onChange"});
  
  const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: data => {
      const { username, password } = getValues();
      const { createAccount: { ok, error } } = data;
      if (!ok) return setError("result", { message: error });
      navigate(routes.login, { replace: true, state: {message: 'Account created. Please log in', username, password} });
    }
  })
  
  const onSubmitValid = (data) => {
    if (loading) return;
    createAccount({variables: { ...data }})
  }
  
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x"/>
          <SubTitle >Sign up to see photos or videos from your friends.</SubTitle>
        </HeaderContainer>
        
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <SInput {...register("firstName", {required: "First Name is required."})} type="text"
                  placeholder="First Name"/>
          <ErrorMessage errors={errors} name="firstName" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <SInput {...register("lastName")} type="text" placeholder="Last Name"/>
          
          <SInput {...register("email", {required: "Email is required."})} type="text" placeholder="Email"/>
          <ErrorMessage errors={errors} name="email" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <SInput {...register("username", {required: "Username is required."})} type="text"
                  placeholder="Username"/>
          <ErrorMessage errors={errors} name="username" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <SInput {...register("password", {required: "Password is required."})} type="password"
                  placeholder="Password"/>
          <ErrorMessage errors={errors} name="password" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
  
          <Button type="submit" disabled={!isValid || loading}>{loading ? "Loading..." : "Sign up"}</Button>
          <ErrorMessage errors={errors} name="result" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.login} />
    </AuthLayout>
  );
};

export default SignUp;
