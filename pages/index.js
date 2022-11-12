import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Router from 'next/router'



export default function Home() {

  // useEffect(() => {
  //   setTimeout( function() { 
  //     if(localStorage.getItem('token')==null){
  //       Router.push('/Login')
  //     }

  //   }, 2000);
  // }, [Router])
  useEffect(() => {
    if(localStorage.getItem('token')==null){
      Router.push('/Login');
    }
  })
  
  return (
    <>
    <h1>hello world index page</h1>
    <Link href="/chat">chat</Link>
    </>
  )
}
