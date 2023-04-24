import { authModalState } from '@/atoms/authModalAtom';
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '../../../../firebase/clientApp'
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
type SignUpProps = {

}


const SignUp: React.FC<SignUpProps> = () => {

    // Method to update the modal state using Recoil
    const setAuthModalState = useSetRecoilState(authModalState)

    // Sign Up Component state 
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword:''
    })

    // Error state initialized to empty string
    const [error, setError] = useState('');

    // Authentication Hooks
    const[
        createUserWithEmailAndPassword,
        user,
        loading,
        userError, 
    ] = useCreateUserWithEmailAndPassword(auth)

    // Firebase handling
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(error) {
            setError('')
            return;
        }

        if(signUpForm.password !== signUpForm.confirmPassword) {
            // throw an error 
            setError('Passwords do not match')
            return;
        }

        // otherwise we tell firebase to create the user
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);

    }

    // The event: argument to onChange is a TypeScript pattern
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
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
                    bg: 'white',
                    border: '1px solid',
                    borderColor: "blue.500"

                }}
                onChange={onChange}>
            </Input>

            <Input
                name='password'
                placeholder='password'
                type='password'
                fontSize='10pt'
                mb={2}
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: "blue.500"
                }}
                onChange={onChange}>
            </Input>
            <Input
                name='confirmPassword'
                placeholder='confirm password'
                type='confirmPassword'
                fontSize='10pt'
                mb={2}
                _placeholder={{ color: 'gray.500' }}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: "blue.500"
                }}
                onChange={onChange}>
            </Input>

            
            <Text textAlign='center' color='red.500' fontSize='10pt'>
            {(error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS])}
            </Text>
            
            <Button
                height='36px'
                width='100%'
                mt={2}
                mb={2}
                type='submit'
                isLoading={loading}>
                Sign Up</Button>

            <Flex fontSize='9pt' justify='center'>
                <Text mr={1}>Already a redditor?</Text>
                <Text 
                color='blue.500' 
                fontWeight={700} 
                cursor='pointer' 
                onClick={() =>
                    setAuthModalState((prev) => ({
                        ...prev,
                        /*We only modify the view */
                        view:'login'
                    }))
                }>LOG IN</Text>
        </Flex>
        </form >
    )
}


export default SignUp;