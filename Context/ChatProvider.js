import React, { createContext, useContext, useEffect, useState } from "react";
import Router, { useRouter } from 'next/router'
import  secureLocalStorage  from  "react-secure-storage";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState([]);
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [Alloffer, setAlloffer] = useState([])
  const [Session, setSession] = useState()


  const getdata=async ()=>{
    const res =await fetch('http://localhost:3001/api/auth/getuser', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'auth-token':secureLocalStorage.getItem('token')
      },
    })
    let data=await res.json()
    // localStorage.setItem("name",data.name)
    // console.log(data)
    setUser(data);
    // Router.push('/')
}


  useEffect(() => {
    // const userInfo = JSON.parse(localStorage.getItem("token"));
    // // console.log(userInfo)
    // setUser(userInfo);
    
    getdata();
    if (user==null) router.push("/Login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        Session,
        setSession
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};




export default ChatProvider;
