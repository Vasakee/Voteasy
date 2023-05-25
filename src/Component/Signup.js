import { VStack, FormControl, FormLabel, Input, InputGroup,InputRightElement, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from './firebaseConfig'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [matric, setMatric] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = () => setShow(!show)
    const handleClick2 = () => setShow2(!show2)
    const Notify = useToast()
    const Navigate = useNavigate()

    const SignUp = (e) => {
        e.preventDefault()
        setLoading(true)
        if (!name || !email || !matric || !password || !confirmPassword) {
             Notify({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
             }) 
            setLoading(false)
            return
        } 
        if (password !== confirmPassword) {
            Notify({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            }) 
            setLoading(false)
            return
        } else {
           try {
                //.auth()
                createUserWithEmailAndPassword(auth, email, password)
               Notify({
                title: 'account created successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
               })
               setLoading(false)
               Navigate('/Votepage')
               return
           } catch (error) {
               console.log(error.message)
               Notify({
                   title: 'an error occured',
                   status: 'error',
                   duration: 5000,
                   isClosable: true,
                   position: 'top-right'
               })
               setLoading(false)
               return
           }
        }
    }
  return (
    <VStack>
       <FormControl id='first-Name'  isRequired>
              <FormLabel>Name</FormLabel>
              <Input placeholder='Enter Name here' value={name} onChange={(e) =>setName(e.target.value)} />
          </FormControl>
          <FormControl id='Email'  isRequired>
              <FormLabel>Email</FormLabel>
              <Input placeholder='Enter email here' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>
           <FormControl id='Matric' isRequired>
              <FormLabel>Matric No</FormLabel>
              <Input placeholder='Enter Matric No here' value={matric} onChange={(e) => setMatric(e.target.value)} />
          </FormControl>
          <FormControl id='Password' isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                  <Input placeholder='Enter password here' value={password} type={show ? 'text':'password'} onChange={(e) => setPassword(e.target.value)}  />
                  <InputRightElement width={'4.5rem'} >
                      <Button h='1.75rem' size={'sm'} onClick = {handleClick} >
                    {show ? <i className='fa fa-eye-slash' aria-hidden='true'></i>: <i className='fa fa-eye' aria-hidden='true'></i> }
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>
           <FormControl id='confirmPassword' isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                  <Input placeholder='Enter password here' value={confirmPassword} type={show2 ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <InputRightElement width={'4.5rem'} >
                      <Button h='1.75rem' size={'sm'} onClick = {handleClick2} >
                          {show2 ? <i className='fa fa-eye-slash' aria-hidden='true'></i>: <i className='fa fa-eye' aria-hidden='true'></i>}
                      </Button>
                  </InputRightElement>
              </InputGroup>
          </FormControl>
          <Button colorScheme={'purple'} width='100%' style={{ marginTop: 15 }} isLoading={loading} onClick={SignUp}  >
              Sign Up
              </Button>
    </VStack>
  )
}

export default Signup
/* const submitHandler = () => {
        setloading(true)
        if (!name || !email || !password || !confirmPassword) {
            notify({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setloading(false)
            return;
        }
        if (password !== confirmPassword) {
            notify({
                title: 'passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
            })
            setloading(false)
            return;
        }
        else {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
                const { data } =  axios.post(
                    '/api/users', {name, email, password, ProfilePic}, config
                )
                console.log(data)
               notify({
                title: 'account created successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right'
               })
                localStorage.setItem("userInfo", JSON.stringify(data))
                setloading(false)
                navigate('/chats')
            } catch (error) {
                notify({
                    title: 'An error occured',
                    description: error.response.data.message,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'top-right'
            })
            setloading(false)
            }
        }*/