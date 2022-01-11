import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components'
import { gql, useMutation } from '@apollo/client';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import routes from "../../routes_var";
import AuthLayout from "../Layouts/AuthLayout";
import Button from "../UI/auth/Button";
import Separator from "../UI/auth/Separator";
import FormBox from "../UI/auth/FormBox";
import BottomBox from "../UI/auth/BottomBox";
import PageTitle from "../UI/PageTitle";
import {ErrorMessageP, SInput} from "../sharedStyles";
import {logUserIn} from "../../apollo";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

const Notification = styled.div`
  color: green;
`

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String! ) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`

const Login = () => {
  
  let location = useLocation();
  
  const {register, handleSubmit, formState: { errors, isValid}, getValues, setError, clearErrors } = useForm(
    {
      criteriaMode: "all",
      mode: "onChange",
      defaultValues: { username: location?.state?.username || "", password: location?.state?.password || "" }});
  
  const [login, {loading}] = useMutation(LOGIN_MUTATION, {
    onCompleted: data => {
      const { login: { ok, token, error } } = data;
      if (!ok) return setError("result", { message: error });
      if (token) logUserIn(token);
    }
  });
  
  const onSubmitValid = () => {
    if (loading) return;
    const {username, password} = getValues();
    login({ variables: {username, password}})
  }
  
  const clearLoginError = () => clearErrors('result');
  
  return (
    <AuthLayout>
      <PageTitle title="Log in" />
      <FormBox>
        <div><FontAwesomeIcon icon={faInstagram} size="3x"/></div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <SInput {...register("username", {required: "Username is required.", minLength: {
              value: 5,
              message: "This input must exceed 4 characters"} })
            }
            type="text" placeholder="Username" hasError={errors.username} onChange={clearLoginError}/>
          <ErrorMessage errors={errors} name="username" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <SInput {...register("password", { required: "Password is required."})}
                 type="password" placeholder="Password" hasError={errors.password} onChange={clearLoginError}/>
          <ErrorMessage errors={errors} name="password" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <Button type="submit" disabled={!isValid || loading}>{loading ? "Loading..." : "Log in"}</Button>
          <ErrorMessage errors={errors} name="result" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
        </form>
        <Separator text="or" />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox cta="Don't have an account?" linkText="Sign up" link={routes.signup} />
    </AuthLayout>
  );
};

export default Login;
