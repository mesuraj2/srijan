// import Head from 'next/head'
// import Image from 'next/image'
import { useState ,useEffect} from 'react'
import Link from 'next/link'
// import styles from '../styles/Home.module.css'
import Router from 'next/router'
import Offer from '../components/Offer'
import  secureLocalStorage  from  "react-secure-storage";



import React from 'react'


export default function Index() {
  const [Alloffer, setAlloffer] = useState([])
  const [Allchat, setAllchat] = useState([])
  const getoffernearyou=async ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let latitude=position.coords.latitude
      let longitude=position.coords.longitude
      // console.log(latitude,longitude)
    })
      const res =await fetch(`/api/offer/offernearyou`, {
    method: 'GET',
  })
  let Alloffer= await res.json()
  // console.log(Alloffer)
  setAlloffer(Alloffer)
  }
  const getallchatnearyou=async ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let latitude=position.coords.latitude
      let longitude=position.coords.longitude
      // console.log(latitude,longitude)
    })
      const res =await fetch(`/api/offer/topChatnearYou`, {
    method: 'GET',
  })
  let allchat= await res.json()
  // console.log(allchat[0].users.length)
  setAllchat(allchat)
  }
  useEffect(() => {
    getoffernearyou()
    getallchatnearyou()
  }, [])
  return (
    <div>
      {/* <a href="/suraj.html">view pdf</a> */}
      <Offer  alloffer={Alloffer} allchat={Allchat}/>
    </div>
  )
}

