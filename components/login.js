import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  secureLocalStorage  from  "react-secure-storage";
import { ChatState } from "../Context/ChatProvider";

export default function Login() {
  const {register,handleSubmit}=useForm()
  const {
    user,
    setUser,
  } = ChatState();

  const loginsubmitForm=async (value)=>{
    // console.log(value)
    
    // console.log(value.name,value.email,value.password)

      // e.preventDefault();
      // setmessage(null)
      const res =await fetch('http://128.199.17.123/api/auth/login', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(value),
      })
      let data=await res.json()
      if(data.isverified==false){
        toast('You did not Verify your email', {
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
      secureLocalStorage.setItem("token",data.authtoken);
      secureLocalStorage.setItem("id",data.id);

      const res =await fetch('http://localhost:3001/api/auth/getuser', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':secureLocalStorage.getItem('token')
        },
      })
      let data2=await res.json()
      secureLocalStorage.setItem("user", JSON.stringify(data2))
      // localStorage.setItem("name",data.name)
      setUser(data2);
      // console.log(data)
      Router.push('/')
      }
  }
  // const getdata=async ()=>{
  //     const res =await fetch('http://localhost:3001/api/auth/getuser', {
  //       method: 'POST', // or 'PUT'
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'auth-token':secureLocalStorage.getItem('token')
  //       },
  //     })
  //     let data=await res.json()
  //     secureLocalStorage.setItem("user", JSON.stringify(data))
  //     // localStorage.setItem("name",data.name)
  //     setUser(data);
  //     // console.log(data)
  //     // Router.push('/')
  // }
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
      <h2>Login</h2>
      <form className='flex flex-col items-center items-center' onSubmit={handleSubmit(loginsubmitForm)}>
        <input type="email" className='my-2' placeholder='enter your email' required {...register('email')}/>
        <input type="password"  placeholder='enter your password' required {...register('password')}/>
        <button>submit</button>
      </form>
    </>
  )
}





