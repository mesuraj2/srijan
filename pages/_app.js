import '../styles/globals.css'
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar';
import ChatProvider from "../Context/ChatProvider";

function MyApp({ Component, pageProps }) {
  return  (<>
  <ChatProvider >
  <ChakraProvider>
<Head>
   <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<Navbar/>
<Component {...pageProps} />
</ChakraProvider>
</ChatProvider>
  </>
  )
}

export default MyApp
