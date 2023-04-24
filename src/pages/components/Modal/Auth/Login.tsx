import { authModalState } from '@/atoms/authModalAtom';
import { Flex, Input, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
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
type LoginProps = {

}


const Login: React.FC<LoginProps> = () => {

    const setAuthModalState = useSetRecoilState(authModalState)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth)

    // Firebase handling
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password)
    }

    // The event:..... argument to onChange is a TypeScript pattern
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
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

            {error && (
                <Text align='center' color='red'>
                   {FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            )}

            <Button
                height='36px'
                width='100%'
                mt={2}
                mb={2}
                type='submit'
                isLoading={loading}>
                Log In</Button>
            
            <Flex justify='center' mb={2}>
                <Text fontSize='9pt' mr={1}>
                    Forgot your password?
                </Text>
                <Text
                fontSize='9pt'
                color='blue.500'
                cursor='pointer'
                onClick={()=>
                    setAuthModalState((prev)=>({
                        ...prev,
                        view:'resetPassword'
                    }))
                }>
                Reset
                </Text>
            </Flex>
            <Flex fontSize='9pt' justify='center'>
                <Text mr={1}>New here?</Text>
                <Text
                    color='blue.500'
                    fontWeight={700}
                    cursor='pointer'
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            /*We only modify the view */
                            view: 'signup'
                        }))
                    }>SIGN UP</Text>
            </Flex>
        </form >
    )
}


export default Login;