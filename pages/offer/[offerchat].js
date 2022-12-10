import React from 'react'
import Router, { useRouter } from 'next/router'
import { useState,useEffect } from 'react'
import {useToast} from "@chakra-ui/react";
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react"; 
import  secureLocalStorage  from  "react-secure-storage";

export default function Offerchat({Offerdetail}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter()
  const [chatid, setchatid] = useState()
  const toast = useToast();
  const [chatname, setchatname] = useState()
  const [coord, setcoord] = useState([])
 

  const Joinchat= async()=>{
    if(!secureLocalStorage.getItem('token')){
      Router.push('/Login')
    }else{
    const res =await fetch(`/api/chat/groupaddOffer`, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'auth-token':secureLocalStorage.getItem('token')
        },
        body:JSON.stringify({userId:secureLocalStorage.getItem('id'),chatId:Offerdetail.chat_id}),
      })
      let data= await res.json()
      if(data.exits){
        toast({
        title: "User already exits",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
Router.push('/chat')
      }
      else{
        toast({
        title: "successfull added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      Router.push('/chat')
      }
    }
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const config = {
      headers: {
        'auth-token':secureLocalStorage.getItem('token'),
      },
    };
    const { data } = await axios.post(
      `/api/chat/offerchat`,
      {
        chatName: chatname,
        offerid:router.query.offerchat,
        coordinate: JSON.stringify([17.6140,78.0816]),
      },
      config
    );
    // console.log(data)
      toast({
        title: "successfull created",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // setInterval(function(){Router.push("/chat")},2000);
      Router.push('/chat')
    setchatname("")
  }
  
  return (
    <>
    <h1>{Offerdetail.offername}</h1>
    <div>{Offerdetail.chat_id? (<div>there is already a chat 
      want to <button onClick={Joinchat}>join</button> 
    </div>):(<div>there is no chat do you want to <button onClick={onOpen}>create</button>
    </div>)}</div>
    <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
           Form
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='enter your chat Name' value={chatname} onChange={(e) => setchatname(e.target.value)} />
            <button  onClick={onClose}>submit</button>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    
  )
}

export async function getServerSideProps(context) {
  const res =await fetch(`http://localhost:3000/api/offer/offerdetail`, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({id:context.query.offerchat})
  })
  let data= await res.json()
  // console.log(data[0])
  return {
    props: { Offerdetail:data[0] }, // will be passed to the page component as props
  }
}
