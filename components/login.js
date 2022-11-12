import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function about() {
  const {register,handleSubmit}=useForm()

  const loginsubmitForm=async (value)=>{
    // console.log(value)
    
    // console.log(value.name,value.email,value.password)

      // e.preventDefault();
      // setmessage(null)
      const res =await fetch('http://localhost:3001/api/auth/login', {
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
      // localStorage.setItem("token",data)
      localStorage.setItem("token",data.authtoken);
      localStorage.setItem("id",data.id);

      getdata();
      // console.log(data)
      Router.push('/')
      }
  }
  const getdata=async ()=>{
      const res =await fetch('http://localhost:3001/api/auth/getuser', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('token')
        },
      })
      let data=await res.json()
      localStorage.setItem("user", JSON.stringify(data))
      // localStorage.setItem("name",data.name)
      // console.log(data)
      // Router.push('/')
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
      <h2>Login</h2>
      <form className='flex flex-col items-center items-center' onSubmit={handleSubmit(loginsubmitForm)}>
        <input type="email" className='my-2' placeholder='enter your email' required {...register('email')}/>
        <input type="password"  placeholder='enter your password' required {...register('password')}/>
        <button>submit</button>
      </form>
    </>
  )
}

export default about



