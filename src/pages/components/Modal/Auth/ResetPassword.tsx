import { authModalState } from '@/atoms/authModalAtom';
import { Flex, Input, Button, Text, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';



/*
This syntax is often used in React to define the 
type of the props that a component expects to 
receive. By defining the type of the props, TypeScript 
can provide better type checking and can help catch errors 
at compile time. The typeName in typeNameProps is 
typically replaced with the name of the component to 
which the props apply. For example, if the component is 
called MyComponent, then the type for the props might be
defined as MyComponentProps = {}.
*/
type ResetPasswordProps = {

}


const ResetPassword: React.FC<ResetPasswordProps> = () => {

    // This is used for navigating to a different modal view since the
    // current view will give the user the option to go back to the
    // sign in or sign up modal views, so we need a bridge of communication
    // with the AuthModal 
    const setAuthModalState = useSetRecoilState(authModalState)

    const [email, setEmail] = useState('')
    const[success, setSuccess] = useState(false)

    const[sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth)

    // Firebase handling
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await sendPasswordResetEmail(email);
        setSuccess(true)

    }


    return (
        <Flex flexDirection='column'>
            <Image src="/images/redditFace.svg"
                alt='reddit face logo'
                width="30"
                height="30" mb={3}/>
            <Text textAlign='center' fontWeight={700} mb={2}>Reset Your Password</Text>
            
            <Text>
                {success? 
                <Text textAlign='center'>Check your email</Text>: 
                <>
                <Text textAlign='center' mb={2} fontSize='10pt'>Enter the email associated with your  <br></br> account and we'll send you a reset link</Text>
                <form onSubmit={onSubmit}>
                <Input
                name='email'
                placeholder='email'
                type='email'
                mb={2}
                fontSize='10pt'
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'gray.50',
                    border: '1px solid',
                    borderColor: "blue.500"
    
                }}
                onChange={(event)=>setEmail(event.target.value)}>
                </Input>
    
                <Button 
                type='submit'
                variant='solid' 
                height='35'
                width='100%'
                mt={2}
                mb={3}
                >Reset Password</Button>
            </form>
            </>
         
                }
            </Text>
            
      
        <Flex justify='center'>
            <Text 
            color='blue.500' fontSize='8pt'fontWeight={700} mr={4}
            _hover={{cursor:'pointer'}}
            onClick={()=>(
                setAuthModalState((prev)=>({
                    ...prev,
                    view:'login'
                }))
            )}
            >LOGIN</Text>
            <Text color='blue.500' fontSize='8pt'fontWeight={700}
            _hover={{cursor:'pointer'}}
            onClick={()=>(
                setAuthModalState((prev)=>({
                    ...prev,
                    view:'signup'
                }))
            )}>SIGN UP</Text>
        </Flex>
        </Flex>



    )
}


export default ResetPassword;