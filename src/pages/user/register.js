import React from "react";
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import HeaderSignin from "../../components/HeaderSigin/HeaderSignin";

import './signin.css'

const validationInsertDoctor = yup.object().shape({
    login: yup.string().required("Login is mandatory").max(255, "Must be less than 255 characters."),
    name: yup.string().required("Name is mandatory").max(255, "Must be less than 255 characters."),
    email: yup.string().required("Email is mandatory").max(255, "Must be less than 255 characters."),
    password: yup.string().required("Password is mandatory").min(6, "Must have at least 6 characters.")
})

function SignIn() {

  let history = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(validationInsertDoctor)
  })

  const addDoctor = data => axios.post("http://localhost:8080/api/user", data)
    .then(() => {
        console.log("User successfully registered.")
        history.push("/")
    })
    .catch(() => {
        console.log("User's registration failed.")
    })

  return (
      <div>
          <HeaderSignin />

            <main>

                <div className="card-post" >

                    <h1>Register</h1>
                    <div className="line-post" ></div>

                    <div className="card-body-post" >

                        <form onSubmit={handleSubmit(addDoctor)} >

                            <div className="fields" >
                                <label>Login</label>
                                <input type="text" name="login" {...register("login")} />
                                <p className="error-message">{errors.login?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Name</label>
                                <input type="text" name="name" {...register("name")} />
                                <p className="error-message">{errors.name?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Email</label>
                                <input type="text" name="email" {...register("email")} />
                                <p className="error-message">{errors.email?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Password</label>
                                <input type="password" name="password" {...register("password")} />
                                <p className="error-message">{errors.password?.message}</p>
                            </div>

                            <div className="btn-post" >
                                <button type="Submit" >Submit</button>
                            </div>

                            <div className="fields" >
                                <a href="/">
                                  <p>Already have registration? <span>Sign In.</span></p>
                                </a>
                            </div>

                        </form>

                    </div>

                </div>

            </main>
      </div>
  )
}

export default SignIn;