import React, { useEffect } from 'react'
import axios from 'axios'

import HeaderDoctor from '../../components/Header/HeaderDoctor'

import { useHistory, useParams } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import NativeSelect from '@mui/material/NativeSelect';

import './listAppointment.css'

const validationUpdateAppointment = yup.object().shape({
  specialty: yup.string().required("Specialties is mandatory").max(255, "Specialties must be less than 255 characters.")
})

function EditDoctor() {

  const { id } = useParams()

    let history = useHistory()

    
    const updateAppointment = data => axios.put(`http://localhost:8080/api/appointment`, data)
    .then(() => {
      console.log("Doctor successfully updated.")
      console.log(data)
      history.push("/appointment/list")
  })
  .catch(() => {
      console.log("Appointment's update failed.")
      console.log(data)
  })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validationUpdateAppointment)
    })

    useEffect(() => {
        axios.get(`http://localhost:8080/api/appointment/${id}`)
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

                  <h1>Edit Appointment</h1>
                  <div className="line-post" ></div>

                  <div className="card-body-post" >

                      <form onSubmit={handleSubmit(updateAppointment)} >

                            <div className="fields" >
                                    <label>Specialty</label>
                                    <input type="text" name="specialty" {...register("specialty")} />
                                    <p className="error-message">{errors.specialty?.message}</p>
                                </div>

                                <div className="fields" >
                                    <label>Doctor</label>
                                    <input type="text" name="user_model_id" {...register("user_model_id")} />
                                    <p className="error-message">{errors.user_model_id?.message}</p>
                                </div>

                                <div className="fields" >
                                    <label>Date</label>
                                    <input type="text" name="appointmentDate" {...register("appointmentDate")} />
                                    <p className="error-message">{errors.appointmentDate?.message}</p>
                                </div>
                                
                                <div className="fields" >
                                    <label>Time</label>
                                    <input type="text" name="appointmentTime" {...register("appointmentTime")} />
                                    <p className="error-message">{errors.appointmentTime?.message}</p>
                                </div>

                                <div className="fields" >
                                    <label>Status</label>
                                    <NativeSelect id="select" name="status" {...register("status")} className="select">
                                        <option value="1">Open</option>
                                        <option value="2">Canceled</option>
                                        <option value="3">Performed</option>
                                    </NativeSelect>
                                    <p className="error-message">{errors.status?.message}</p>

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