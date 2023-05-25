/* eslint-disable no-lone-blocks */
import {Box,Button, Checkbox,  Text, VStack,  Img, Flex, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, useToast, } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { database } from '../Component/firebaseConfig'
import { auth } from '../Component/firebaseConfig'
import { collection, doc, getDocs, runTransaction,} from 'firebase/firestore'
import CountdownTimer from '../Component/CountdownTimer'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const VotePage = () => {
  const [President, setPresident] = useState([])
  const [selectPres, setSelectPres] = useState(-1)
  const [Secretary, setSecretary] = useState([])
  const [selectSec, setSelectSec] = useState(-1)
  const [Socials, setSocials] = useState([])
  const [selectSocials, setSelectSocials] = useState(-1)
  const [isModalopen, setIsModalOpen] = useState(false)
  
  const Notify = useToast()
  const Navigate = useNavigate()

  const hanldeConfirmSubmit = () => {
    if (selectPres !== -1  && selectSec !== -1  && selectSocials !== -1) {
      setIsModalOpen(true)
    } else {
      Notify({
        title: 'ensure that you vote in all categories',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const submitForm = () => {
      console.log('submitted')
    submitPresido()
    submitSec()
    submitSocial()
    closeModal()
    Notify({
      title: 'Your Votes have successfully been uploaded!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'top-right'
    })
    signOut(auth)
    Navigate('/')
  }

  const PresidentSelect = (presId) => {
    setSelectPres(presId)
  }
  const SecretarySelect = (secId) => {
     setSelectSec(secId)
  }
  const SocialSelect = (socialId) => {
     setSelectSocials(socialId)
  }
  const submitPresido = () => {
    const presido = doc(database, 'Candidate', President[selectPres].id) 
    runTransaction(database, async (transaction) => {
      const doc = await transaction.get(presido)
      const newValue = doc.data().Votes + 1
      transaction.update(presido, { Votes: newValue })
    })
  }
  const submitSec = () => {
    const sec = doc(database, 'Secretary', Secretary[selectSec].id) 
    runTransaction(database, async (transaction) => {
      const doc = await transaction.get(sec)
      const newValue = doc.data().Votes + 1
      transaction.update(sec, { Votes: newValue })
    })
  }
  const submitSocial = () => {
    const sec = doc(database, 'Director Of Socials', Socials[selectSocials].id) 
    runTransaction(database, async (transaction) => {
      const doc = await transaction.get(sec)
      const newValue = doc.data().Votes + 1
      transaction.update(sec, { Votes: newValue })
    })
  }

  useEffect(() => {
    const fetchedData = async () => {
      const collRef = collection(database, 'Candidate')
      const President = await getDocs(collRef)
      const result = President.docs.map((doc) => ({
        key: doc.id,
        id: doc.id,
        name: doc.data().Name,
        Votes:doc.data().Votes,
        ...doc.data()
      }))
      setPresident(result)
    }
    fetchedData()
  }, [])
   useEffect(() => {
    const fetchedData = async () => {
      const collRef = collection(database, 'Secretary')
      const Secretary = await getDocs(collRef)
      const result = Secretary.docs.map((doc) => ({
        key: doc.id,
        id: doc.id,
         name: doc.data().Name,
        Votes:doc.data().Votes,
        ...doc.data()
      }))
      setSecretary(result)
    }
    fetchedData()
   }, [])
  useEffect(() => {
    const fetchedData = async () => {
      const collRef = collection(database, 'Director Of Socials')
      const Socials = await getDocs(collRef)
      const result = Socials.docs.map((doc) => ({
        key: doc.id,
        id: doc.id,
         name: doc.data().Name,
        Votes:doc.data().Votes,
        ...doc.data()
      }))
      setSocials(result)
    }
    fetchedData()
  }, [])

  return (
    <VStack >
      <Text fontSize='5xl' fontFamily='-moz-initial' position={'initial'} fontWeight='bold' ml='6cm' color='#FF5733' >VOTEASY!!</Text> <br />
      
      <CountdownTimer time={320} />
        <Box p={'4'}>
        <Heading as={'h2'} size={'2xl'} color='white'>President</Heading>
        <Flex alignItems={'center'} justifyContent={'center'} color='white' className='display'>
              {President.map((disp, presId) =>
                <Box key={disp.id} p={'5'} shadow='md' borderRadius={'5px'}>
                      <Img boxSize={'200px'} objectFit='cover' src={disp.Pictures} alt='candidate pic' /> <br />
              <b>Name:</b>{disp.Name} <br /> <b>Faculty:</b>  {disp.Faculty} <br />
              <b>Vote:</b><Checkbox isChecked={selectPres === presId} onChange={() => PresidentSelect(presId)} size={'lg'} colorScheme='purple' /> 
           </Box>)}
        </Flex>
      </Box>
      <hr />
       <Box p={'4'}>
        <Heading as={'h2'} size={'2xl'} color='white'>Secretary</Heading>
        <Flex alignItems={'center'} justifyContent={'center'} color='white' className='display'>
              {Secretary.map((sec, secId) =>
                <Box key={sec.id} p={'5'} shadow='md' borderRadius={'5px'}>
                      <Img boxSize={'200px'} objectFit='cover' src={sec.Pictures} alt='candidate pic' /> <br />
              <b>Name:</b>{sec.Name} <br /> <b>Faculty:</b>  {sec.Faculty} <br />
              <b>Vote:</b><Checkbox isChecked={selectSec === secId} onChange={() => SecretarySelect(secId)} size={'lg'} colorScheme='purple' /> 
           </Box>)}
        </Flex>
      </Box>
      <hr />
      <Box p={'4'}>
        <Heading as={'h2'} size={'2xl'} color='white'>Director Of Socials</Heading>
        <Flex alignItems={'center'} justifyContent={'center'} color='white' className='display'>
              {Socials.map((soc, socialId) =>
                <Box key={soc.id} p={'5'} shadow='md' borderRadius={'5px'}>
                      <Img boxSize={'200px'} objectFit='cover' src={soc.Pictures} alt='candidate pic' /> <br />
              <b>Name:</b>{soc.Name} <br /> <b>Faculty:</b>  {soc.Faculty} <br />
              <b>Vote:</b><Checkbox isChecked={selectSocials === socialId} onChange={() => SocialSelect(socialId)} size={'lg'} colorScheme='purple' /> 
           </Box>)}
        </Flex>
        </Box>
      <Button colorScheme={'purple'} width='100%' style={{ marginTop: 15 }} onClick={hanldeConfirmSubmit}  >
              Submit
      </Button>
      <Modal isOpen={isModalopen} onClose={closeModal} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to submit ?</ModalHeader>
          <ModalFooter>
            <Button colorScheme={'gray'} mr={3} onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme={'blue'} onClick={submitForm}>
              Submit votes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default VotePage
