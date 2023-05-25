import { Heading, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {getAuth, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


function CountdownTimer({ time }) {
    const [Timer, setTimer] = useState(time)

    const navigate = useNavigate()
    const Notify = useToast()
    useEffect(() => {
            const interval = setInterval(() => {
                if (Timer > 0) {
                    setTimer(prevTime => prevTime - 1)
                }
            }, 1000)

        return () => {
            clearInterval(interval)
        }
        
    }, [Timer])

    useEffect(() => {
        if (Timer === 0) {
            const auth = getAuth()
            signOut(auth)
                .then(() => {
              console.log('logged out')
              navigate('/')  
                })
                .catch(error => {
                console.log(error)
            })
        }
        if (Timer === 180) {
             Notify({
        title: 'You have 3 minutes remaining!!!',
        status: 'warning',
        duration: 10000,
        isClosable: true,
        position: 'top-right'
      })
        }
        if (Timer === 180) {
             Notify({
        title: 'You have 3 minutes remaining!!!',
        status: 'warning',
        duration: 10000,
        isClosable: true,
        position: 'top-right'
      })
        }
    },[Timer, navigate, Notify])

        const minutes = Math.floor(Timer / 60)
        const seconds = Timer % 60 

  return (
    <div>
          <Heading as={'h2'} size={'2xl'} color={'white'}>Time left: {minutes}:{seconds < 10 ? `0${seconds}`:seconds}</Heading>
    </div>
  )
}

export default CountdownTimer
