import React from "react";
import axios from 'axios';

import { useForm } from 'react-hook-form';
import HeaderAppointment from "../../components/Header/HeaderAppointment";
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import './listAppointment.css'
import NativeSelect from '@mui/material/NativeSelect';

const validationInsertAppointment = yup.object().shape({
  specialty: yup.string().required("Specialties is mandatory").max(255, "Specialties must be less than 255 characters.")
})

function InsertAppointment() {

  let history = useHistory()

  const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(validationInsertAppointment)
  })

  const idUser = localStorage.getItem('id')

  const addAppointment = data => axios.post("http://localhost:8080/api/appointment", data)
    .then(() => {
        console.log("Appointment successfully registered.")
        history.push("/appointment/list")
    })
    .catch(() => {
        console.log("Appointment's registration failed.")
        console.log(data)
    })

    // const addDoctor = data => console.log(data)

  return (
      <div>
          <HeaderAppointment />

            <main>

                <div className="card-post" >

                    <h1>New Appointment</h1>
                    <div className="line-post" ></div>

                    <div className="card-body-post" >

                        <form onSubmit={handleSubmit(addAppointment)} >

                            <div className="fields" >
                                <label>Specialty</label>
                                <input type="text" name="specialty" {...register("specialty")} />
                                <p className="error-message">{errors.specialty?.message}</p>
                            </div>

                            <div className="fields" >
                                <label>Doctor</label>
                                <input type="text" name="doctor_id" {...register("doctor_id")} />
                                <p className="error-message">{errors.doctor_id?.message}</p>
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
                                <input type="hidden" value={ idUser } name="user_model_id" {...register("user_model_id")} />
                                <p className="error-message">{errors.user_model_id?.message}</p>
                            </div>

                            <div className="fields" >
                                <input type="hidden" value={ idUser } name="registrationDate" {...register("registrationDate")} />
                                <p className="error-message">{errors.registrationDate?.message}</p>
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
                                <button type="Submit" >Submit</button>
                            </div>

                        </form>

                    </div>

                </div>

            </main>
      </div>
  )
}

export default InsertAppointment;