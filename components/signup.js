import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function About() {
  const {register,handleSubmit}=useForm()
  const submitForm=async (value)=>{
    console.log(value)
    if(value.password != value.Cpassword){
      toast('Password is not matching', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      const res =await fetch('/api/auth', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(value),
      })
      let data=await res.json()
      console.log(data)
      if(data.emailExits){
        toast('Email already exits', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      else{
      toast('Please check your email, verification has been send to your mail', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
    }
  }
  useEffect(() => {
    if(localStorage.getItem('token')!=null){
      Router.push('/')
    }
  }, [])
  return (
    <>
     
      <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
          {/* Same as */}
          <ToastContainer />
      {/* <form onSubmit={handleSubmit(submitForm)}>
        <input type="text" placeholder='enter your name'  {...register('name',{required:{value:true,message:'name is required'},minLength:{
          value:8,
          message:'name must be greater than 8'

        }})}
        />
      <span>{errors?.name?.message}</span>
        {errors.name && <p>Last name is required.</p>}
        <input type="email" placeholder='enter your email' {...register('email')}/>
        <input type="password" placeholder='enter your password' {...register('password')}/>
        <button>submit</button>
      </form> */}
      <form className='flex flex-col items-center items-center' onSubmit={handleSubmit(submitForm)}>
      <h1 className='text-2xl'>Signup form</h1>
        <input type="text" className='my-2' placeholder='enter your name' required {...register('name')}/>
        <input type="email" className='my-2' placeholder='enter your email' required {...register('email',)}/>
        <input type="password" className='my-2' placeholder='enter your password' required {...register('password')}/>
        <input type="password" className='my-2' placeholder='enter your conform password' required {...register('Cpassword')}/>
        
        <button>submit</button>
      </form>

    </>
  )
}




