import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import routes from "../../routes_var";
import AuthLayout from "../Layouts/AuthLayout";
import Button from "../UI/auth/Button";
import Separator from "../UI/auth/Separator";
import FormBox from "../UI/auth/FormBox";
import BottomBox from "../UI/auth/BottomBox";
import PageTitle from "../UI/PageTitle";
import {ErrorMessageP, SInput} from "../sharedStyles";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`

const Login = () => {
  
  const {register, handleSubmit, formState: { errors, isValid} } = useForm(
    {criteriaMode: "all", mode: "onChange"});
  
  const onSubmitValid = (data) => {
  
  }
  
  return (
    <AuthLayout>
      <PageTitle title="Log in" />
      <FormBox>
        <div><FontAwesomeIcon icon={faInstagram} size="3x"/></div>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          
          <SInput {...register("username", {required: "Username is required.", minLength: {
              value: 5,
              message: "This input must exceed 4 characters"} })
          }
                 type="text" placeholder="Username" hasError={errors.username}/>
          <ErrorMessage errors={errors} name="username" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <SInput {...register("password", { required: "Password is required."})}
                 type="password" placeholder="Password" hasError={errors.password}/>
          <ErrorMessage errors={errors} name="password" render={({ message }) =>
            <ErrorMessageP>{message}</ErrorMessageP>}/>
          
          <Button type="submit" disabled={!isValid}>Log in</Button>
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
