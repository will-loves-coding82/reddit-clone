import React, { useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Flex,
    Text,
} from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { authModalState } from '@/atoms/authModalAtom'
import {useAuthState} from 'react-firebase-hooks/auth';
import AuthInputs from './AuthInputs'
import OAuthButtons from './OAuthButtons'
import { auth } from '@/firebase/clientApp';
import ResetPassword from './ResetPassword';

const AuthModal:React.FC = () => {

    // [default state Value, settingStateFunction()]
    const[modalState, setModalState] = useRecoilState(authModalState)

    const [user,loading,error] = useAuthState(auth)
    
    const handleClose= () => {
        setModalState((prev)=> ({
            /*
            The spread operator ... is used in the context of this code 
            to create a new object that contains all of the properties of the 
            previous state. The prev argument in the code represents the 
            previous state of the component. By spreading prev into a new object 
            with ...prev, we create a new object that has all of the properties 
            of the previous state. For example, if the previous state was 
            {open: true, view: 'login'}, then ...prev would create a 
            new object with the same properties: {open: true, view:'login'}.
            This is important because it allows us to update specific 
            properties of the state without overwriting any other properties. 
            In the example code, only the open property is being updated to false.
             If we didn't use the spread operator, we would end up overwriting the 
             title property as well, which is not what we want.
             */
            ...prev,
            open:false,
        }))
    }

    /*
    The useEffect hook takes two arguments: a callback function and a 
    dependency array. The callback function is executed after every render, 
    and the dependency array specifies the values that the effect depends on. 
    If any of the values in the dependency array change between renders, 
    the effect is re-run. In this code, the effect is only executed when the 
    user variable changes, because user is the only value specified in 
    the dependency array.
    */
    useEffect(()=>{

        // firebase's user hook will check if a user exists, if true close the modal!
        if(user) {
            handleClose();
        }
    },[user])

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* Conditionals to change the header title
                        Note: These are determined by the setAuthModalState()
                        in the auth/inputs components.
                     */}
                    <ModalHeader textAlign='center'>
                        {modalState.view === 'login' && "Log In"}
                        {modalState.view === 'signup' && "Sign Up"}
                        {modalState.view === 'resetPassword' && "Reset Password"}

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='center' mb={4}>
                        <Flex direction='column' align='center' justify='center'width='70%'>
                            {modalState.view ==='login' || modalState.view === 'signup' ? 
                            <>
                                <OAuthButtons/>
                                <Text fontWeight={700} color='gray.500' fontSize='15pt'>OR</Text>
                                <AuthInputs/>
                            </> 
                            :
                            <ResetPassword/> }
                        </Flex>
                    </ModalBody>
                       
                </ModalContent>
            </Modal>

        </>
    )


}

export default AuthModal;