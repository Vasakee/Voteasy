import {Button, VStack, FormControl, FormLabel,Input,InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { auth } from './firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {
  const [matric, setMatricNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClick = () => setShow(!show)
  const Notify = useToast()
  const Navigate = useNavigate()

  const SignIn = (e) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      Notify({
        title: 'Please fill in all the required fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
      setLoading(false)
      return
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user
          console.log(user)
          Notify({
            title: 'Login succesful',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
          setLoading(false)
          Navigate('/Votepage')

        })
        .catch((error) => {
        console.log(error.message)
        if (error.message.includes('wrong-password')) {
          Notify({
            title: 'wrong password',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
        }
        if (error.message.includes('user-not-found')) {
          Notify({
            title: 'User not found',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
        }
        if (error.message.includes('email-already-in-use')) {
          Notify({
            title: 'This email has already been used',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
        }
        if (error.message.includes('network-request-failed')) {
          Notify({
            title: 'Check your Network connection',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
          } 
          if (error.message.includes('auth/invalid-email')) {
          Notify({
            title: 'invalid email',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          })
        } 
        setLoading(false)
        return
      })
    }
  }
  return (
    <VStack>
      <FormControl id='Email1'  isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder='Enter email here' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
           <FormControl id='Matric1' isRequired>
              <FormLabel>Matric No</FormLabel>
              <Input placeholder='Enter Matric No here' value={matric} onChange={(e) => setMatricNo(e.target.value)} />
          </FormControl>
          <FormControl id='Password1' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                  <Input placeholder='Enter password here' value={password} type={show ? 'text':'password'} onChange={(e) => setPassword(e.target.value)}  />
                  <InputRightElement width={'4.5rem'} >
                      <Button h='1.75rem' size={'sm'} onClick = {handleClick} >
                   {show ? <i className='fa fa-eye-slash' aria-hidden='true'></i>: <i className='fa fa-eye' aria-hidden='true'></i>}
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>
          <Button colorScheme={'purple'} width='100%' style={{ marginTop: 15 }} onClick={SignIn} isLoading={loading}>
              Login
              </Button>
    </VStack>
  )
}

export default Login
/*
if(!email||!passwordd){
      toast('please fill in all the fields')
     }else{
     e.preventDefault()
     signInWithEmailAndPassword(auth, email, passwordd)  
     .then((details)=>{
      navigate('/')
      console.log('user logged in', details)
     })
     .catch((err)=>{
      console.log(err.message)
     if(err.message.includes('wrong-password')){
      toast('the password entered does not match this user')
     }
     if(err.message.includes('user-not-found')){
      toast('this user does not exist')
     }
     if(err.message.includes('email-already-in-use')){
      toast('this email is already in use')
     }
     if(err.message.includes('network-request-failed')){
         toast('Check network connection')
     }
     })
    }
   } */