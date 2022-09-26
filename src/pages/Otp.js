import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otpAttemp } from '../store/authActions';
import { authSelector, clearState, sendOtpValidate } from '../store/authSlice';
import toast, { Toaster } from 'react-hot-toast';


const Otp = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { otpSend } = useSelector(authSelector);

    
    useEffect(() => {
        dispatch(sendOtpValidate());
    }, []);


    useEffect(() => {
        if (!otpSend) {
            // navigation('/');
        }
    }, [otpSend]);


    const onSubmit = (data) =>{
        data.deviceId = 'website-portal';
        data.username = localStorage.getItem('username');
        data.deviceType = '0';
        console.log(data)
        dispatch(otpAttemp(data));
    }
    return (
        <Fragment>
            <div className="form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" {...register("code", { required: true })} />
                        <label htmlFor="floatingInput">Otp code </label>
                        {errors.code && <span className="">This field is required</span>}
                    </div>


                    <input className="btn btn-primary w-100" type="submit" />
                </form>
                <Toaster />
            </div>
        </Fragment>
    )
}

export default Otp;