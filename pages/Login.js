import Head from 'next/head'
import { useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text, } from '@chakra-ui/react'
  import Login from '../components/login'
  import Signup from '../components/signup'

export default function Signin({user}) {
  useEffect(() => {
    if(localStorage.getItem('token')!=null){
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
      })
    }
  })
  
  return (
    <>
   <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
        </>
  )
}
