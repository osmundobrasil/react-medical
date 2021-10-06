import React from "react";
import axios from 'axios';

import { useForm } from 'react-hook-form';
import HeaderDoctor from "../../components/Header/HeaderDoctor";
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './doctor.css'

const validationInsertDoctor = yup.object().shape({
  name: yup.string().required("Name is mandatory").max(255, "Name must be less than 255 characters."),
  email: yup.string().required("Email is mandatory").max(255, "Email must be less than 255 characters."),
  specialty: yup.string().required("Specialties is mandatory").max(255, "Specialties must be less than 255 characters."),
  graduation: yup.string().required("Graduation is mandatory").max(255, "Graduation must be less than 255 characters.")
})

function InsertDoctor() {

  let history = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(validationInsertDoctor)
  })

  const addDoctor = data => axios.post("http://localhost:8080/api/doctor", data)
    .then(() => {
        console.log("Doctor successfully registered.")
        history.push("/doctor/list")
    })
    .catch(() => {
        console.log("Doctor's registration failed.")
    })

    // const addDoctor = data => console.log(data)

  return (
      <div>
          <HeaderDoctor />

            <main>

                <div className="card-post" >

                    <h1>New Doctor</h1>
                    <div className="line-post" ></div>

                    <div className="card-body-post" >

                        <form onSubmit={handleSubmit(addDoctor)} >

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
                                <label>Specialties</label>
                                <input type="text" name="specialty" {...register("specialty")} />
                                <p className="error-message">{errors.specialty?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Graduation</label>
                                <input type="text" name="graduation" {...register("graduation")} />
                                <p className="error-message">{errors.graduation?.message}</p>
                            </div>

                            <div className="btn-post" >
                                <button type="Submit" >Submit</button>
                            </div>

                        </form>

                    </div>

                </div>

            </main>
      </div>
  )
}

export default InsertDoctor;