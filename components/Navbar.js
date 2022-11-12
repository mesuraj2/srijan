import React, { useEffect, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import Router from 'next/router'

function Navbar({user}) {

    const [local, setlocal] = useState()
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setlocal(true);
    } else {
      setlocal(false);
    }
  });
  const logout = () => {
    localStorage.removeItem("token");
    setlocal(false);
    Router.push('/Login');
  };
  return (
<Grid templateColumns='repeat(5, 1fr)' gap={6}>
  <GridItem w='100%' h='10' bg='blue.500' />
  <GridItem w='100%' h='10' bg='blue.500' />
  <GridItem w='100%' h='10' bg='blue.500' />
  <GridItem>{user && user.user.name}</GridItem>  
  {local? (<GridItem ><button onClick={logout}>logout</button></GridItem>):(<GridItem ><Link href="/Login">Login</Link></GridItem>) }
</Grid>
  )
}

export default Navbar
