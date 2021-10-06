import React, { useState} from "react";
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import HeaderSignin from "../../components/HeaderSigin/HeaderSignin";

import './signin.css'

const validationInsertDoctor = yup.object().shape({
    login: yup.string().required("Login is mandatory").max(255, "Must have at least 6 characters."),
    password: yup.string().required("Password is mandatory").min(6, "Must have at least 6 characters.")
})

function SignIn() {

  let history = useHistory()

  const [login, setLogin] = useState()
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [id, setId] = useState()

  const storeItem = (key, value) => {
      localStorage.setItem(key, value)
  }

  const findItem = (key) => {
      localStorage.getItem(key)
  }
  
    const deleteItem = (key, value) => {
        localStorage.removeItem(key, value)
    }

  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(validationInsertDoctor)
  })

  const validatePassword = data => axios.post("http://localhost:8080/api/validatePassword?login=" + data.login+ "&password=" + data.password, data)
    .then(() => {
        //console.log(data)

        axios.get(`http://localhost:8080/api/user/userByLogin/${data.login}`)
        .then((response) => {

            storeItem('id', response.data[0])
            storeItem('login', response.data[1])
            storeItem('email', response.data[2])
            storeItem('name', response.data[3])
            console.log(response.data)

        })
        history.push("/home")
    })
    .catch(() => {
        console.log("User not found.")
        console.log(data)
    })

  return (
      <div>
          <HeaderSignin />

            <main>

                <div className="card-post" >

                    <h1>Sign In</h1>
                    <div className="line-post" ></div>

                    <div className="card-body-post" >

                        <form onSubmit={handleSubmit(validatePassword)} >

                            <div className="fields" >
                                <label>Login</label>
                                <input type="text" name="login" {...register("login")} />
                                <p className="error-message">{errors.login?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Password</label>
                                <input type="password" name="password" {...register("password")} />
                                <p className="error-message">{errors.password?.message}</p>
                            </div>

                            <div className="btn-post" >
                                <button type="Submit" >Submit</button>
                            </div>

                            {/* <div className="fields" >
                                <a href="/home">
                                  <p><span>Submit</span></p>
                                </a>
                            </div> */}

                            <div className="fields" >
                                <a href="/register">
                                  <p>Not registered yet? <span>Register.</span></p>
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