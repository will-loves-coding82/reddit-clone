
import { 
    Button, 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
    Box, Divider , Text,
    Input,
    Stack,
    Checkbox,
    Flex,
    Icon} from '@chakra-ui/react';
import { BsFillEyeFill, BsFillPersonFill } from 'react-icons/bs';
import {HiLockClosed} from 'react-icons/hi';
import React from 'react';
import { useState } from 'react';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import {auth, firestore} from '../../../../../../firebase/clientApp'
import { useAuthState } from 'react-firebase-hooks/auth';

// State the types of each prop 
type CreateCommunityModalProps = {
    open: boolean,
    // handleClose doesn't return anything so the return type is void
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {

    // the 2nd arg is a callback function used to update the state variable
    const [user] = useAuthState(auth)
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21)
    const [communityType, setCommunityType] = useState('public')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > 21) {
            return;
        }
        // recalculate how many chars are left in the input and update the community name 
        setCommunityName(event.target.value)
        setCharsRemaining(21-event.target.value.length)


    }

    const onCommunityTypeChange = (event:React.ChangeEvent<HTMLInputElement>)=> {
        setCommunityType(event.target.name)
    }


    const handleCreateCommunity = async() => {
        if (error) setError('');
        // valdiate the community name so that it is syntactically okay and unique 
        const format = /[ `!@#$%^&*()_+-=[\]{}:':"\\|,><>\/?~]`]/
        if (format.test(communityName) || communityName.length < 3) {
            setError('Community names must be between 3-21 characters, and can only contian letters, numbers')
            return
        } 

        setLoading(true)

        try {
            // if valid, then create the community document in firestore
            const communityDocRef = doc(firestore,'communities', communityName);

            await runTransaction(firestore, async(transaction) =>{
                const communityDoc = await transaction.get(communityDocRef);
       
                if (communityDoc.exists()) {
                    throw new Error(`Sorry, r/${communityName} is already taken. Try another`);
                    
                }
                // create the community if unique
                transaction.set(communityDocRef, {
                    // parameters: creatorId, createdAt, numberOfMembers, privacy
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberofMembers:1,
                    privacyType:communityType
                    
                })

                /* create community snippet on user:
                   Make a collection inside the user document called communitSnippets, and store
                   the snippet as a document
                   Note: a firestore transaction is any read or write to a document
                  */
                transaction.set(doc(firestore,`users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName, 
                    isModerator: true
                })
            })
     
            
        
        }
        catch (error:any) {
            console.log('handleCreateCommunity error', error)
            setError(error.message)
        }


        setLoading(false)

    }


    return (
        <>
            {/* The Modal will read in the open and handleClose props. When the 
                handleClose callback is called, it will set the state of the parent prop
                "Communities" to open:false which will then trickle back down here 
                 to tell this CreateCommunityModal to close! Pretty cool!
             */}
            <Modal isOpen={open} onClose={handleClose} size='lg'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display='flex' flexDirection='column' fontSize='15pt' padding={3}>
                        Create a Community
                    </ModalHeader>
                    <Box pl={3} pr={3}>
                            <Divider/>
                                <ModalCloseButton />
                                <ModalBody display='flex' flexDirection='column' padding='10px 0px' >
                                    <Text fontWeight={600} fontSize={15}>
                                        Name
                                    </Text>
                                    <Text fontSize={11} color='gray.500'>
                                        Community names including capitalization cannot be changed
                                    </Text>
                                    <Text>
                                        <Text position='relative' top='28px' left='10px' width='20px' color='gray.400'>r/</Text>
                                        <Input position='relative'value={communityName} size="sm" pl='22px' onChange={handleChange}/>
                                        <Text fontSize='9pt'color={charsRemaining == 0 ? 'red': 'gray.500'}>
                                            {charsRemaining} characters remaining
                                        </Text>
                                        <Text fontSize='9pt' color='red' pt={1}>
                                            {error}
                                        </Text>
                                    </Text>
                                    <Box>
                                        <Text mt={4} mb={4}fontWeight={600} fontSize={15}>
                                            Community Type
                                        </Text>
                                        <Stack spacing={2} mb={2}>
                                            <Checkbox name='public' isChecked={communityType === 'public'} onChange={onCommunityTypeChange}>
                                                <Flex align='center'>
                                                    <Icon as={BsFillPersonFill} color='gray.500' mr={2}></Icon>
                                                    <Text fontSize='10pt' mr={1}>Public</Text>
                                                    <Text fontSize='8pt' color='gray.500' pt={1}>Anyone can view, post, and comment to this communnity</Text>
                                                </Flex>
                                            </Checkbox>
                                            <Checkbox name='restricted'  isChecked={communityType === 'restricted'} onChange={onCommunityTypeChange}>
                                            <Flex align='center'>
                                                    <Icon as={BsFillEyeFill} color='gray.500' mr={2}></Icon>
                                                    <Text fontSize='10pt' mr={1}>Restricted</Text>
                                                    <Text fontSize='8pt' color='gray.500' pt={1}>Anyone can view this communnity, but only approved users can post</Text>
                                                </Flex>
                                            </Checkbox>
                                            <Checkbox name='private' isChecked={communityType === 'private'} onChange={onCommunityTypeChange}>
                                            <Flex align='center'>
                                                    <Icon as={HiLockClosed} color='gray.500' mr={2}></Icon>
                                                    <Text fontSize='10pt' mr={1}>Private</Text>
                                                    <Text fontSize='8pt' color='gray.500' pt={1}>Only approved users can view and submit to this communnity</Text>
                                                </Flex>
                                            </Checkbox>
                                        </Stack>
                                    </Box>
                                </ModalBody>
                    </Box>


                    <ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px'>
                        <Button variant='outline' height='30px' mr={3} onClick={handleClose}>
                            cancel
                        </Button>
                        <Button  isLoading={loading} height='30px' onClick={handleCreateCommunity}>Create Community</Button>
                    </ModalFooter>
                </ModalContent>
                
            </Modal>
        </>
    );
}
export default CreateCommunityModal;

