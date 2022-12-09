import '../styles/globals.css'
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import ChatProvider from "../Context/ChatProvider";



function MyApp({ Component, pageProps }) {
  
  return  (<>
  <ChakraProvider>
  <ChatProvider >
<Head>
   <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<Navbar />
<Component {...pageProps} />
<Footer/>
</ChatProvider>
</ChakraProvider>
  </>
  )
}


export default MyApp
