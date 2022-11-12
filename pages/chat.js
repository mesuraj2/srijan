import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/SideDrawer'
import MyChats from '../components/MyChats'
import Chatbox from '../components/Chatbox'

function chat() {
  const router = useRouter()
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user,setUser } =ChatState(); 

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