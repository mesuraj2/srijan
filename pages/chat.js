import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/SideDrawer'
import MyChats from '../components/MyChats'
import Chatbox from '../components/Chatbox'
import  secureLocalStorage  from  "react-secure-storage";


function chat() {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user,setUser,Session } =ChatState();
  useEffect(() => {
    if(!secureLocalStorage.getItem('token')){
      Router.push('/Login')
    }
  }, [])
  
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box className='flex' justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}

export default chat