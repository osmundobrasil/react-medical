import React, { useEffect } from 'react'
import axios from 'axios'

import HeaderDoctor from '../../components/Header/HeaderDoctor'

import { useHistory, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './doctor.css'

const validationUpdateDoctor = yup.object().shape({
  name: yup.string().required("Name is mandatory").max(255, "Name must be less than 255 characters."),
  email: yup.string().required("Email is mandatory").max(255, "Email must be less than 255 characters."),
  specialty: yup.string().required("Specialties is mandatory").max(255, "Specialties must be less than 255 characters."),
  graduation: yup.string().required("Graduation is mandatory").max(255, "Graduation must be less than 255 characters.")
})

function EditDoctor() {

  const { id } = useParams()

    let history = useHistory()

    
    const updateDoctor = data => axios.put(`http://localhost:8080/api/doctor`, data)
    .then(() => {
      console.log("Doctor successfully updated.")
      history.push("/doctor/list")
  })
  .catch(() => {
      console.log("Doctor's update failed.")
  })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationUpdateDoctor)
    })

    useEffect(() => {
        axios.get(`http://localhost:8080/api/doctor/${id}`)
        .then((response) => {
          console.log(response.data)
            reset(response.data)
        })
        
    }, [])

  return (
    <div>
        <HeaderDoctor />

          <main>

              <div className="card-post" >

                  <h1>Edit Doctor</h1>
                  <div className="line-post" ></div>

                  <div className="card-body-post" >

                      <form onSubmit={handleSubmit(updateDoctor)} >

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
                              <button type="Submit" >Save</button>
                          </div>

                      </form>

                  </div>

              </div>

          </main>
    </div>
)
}

export default EditDoctor;