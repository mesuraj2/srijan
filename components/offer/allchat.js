import React from 'react'
import { useState,useEffect } from 'react'
import Link from 'next/link'


export default function allchat({totalchat}) {



    // const allOffer= async()=>{
    //     const res =await fetch(`http://localhost:3001/api/offer/alloffer`, {
    //         method: 'GET', // or 'PUT'
    //         headers: {
    //         //   'Content-Type': 'application/json',
    //           'auth-token':localStorage.getItem('token')
    //         },
    //       })
    //       let data= await res.json()
    //       setAlloffer(data)
    //     //   console.log(data)
    //   }


  return (
    <div>{ totalchat &&
        totalchat.map((offer)=>(
            <div className='card-design' key={offer._id}>{offer.chatName}</div>
        ))
        }
    </div>
  )
}




