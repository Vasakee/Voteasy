import React from 'react'
import { Container, Box,Text,Tab,Tabs,TabPanels,TabList,TabPanel, } from '@chakra-ui/react'
import Login from '../Component/Login'
import SignUp from '../Component/Signup'
const Homepage = () => {
  return (
      <Container>
      <Box  display={'flex'}
        justifyContent="center"
        p={3}
        className='box'
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
       <Text fontSize='4xl'fontFamily='-moz-initial'position={'initial'}  >VOTEASY!!</Text>
      </Box>
      <Box className='box' w='100%' p={4} borderRadius='lg' borderWidth='1px'>
        <Tabs variant='soft-rounded' >
  <TabList mb='1em'>
    <Tab width='50%'>Login</Tab>
    <Tab width='50%'>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <div><Login /></div>
    </TabPanel>
    <TabPanel>
      <div><SignUp /></div>
    </TabPanel>
  </TabPanels>
</Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
