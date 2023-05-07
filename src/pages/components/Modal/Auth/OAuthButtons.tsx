import { Flex, Button, Image, Text} from '@chakra-ui/react';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {auth, firestore} from '../../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

import React, { useEffect } from 'react';
import { createUserDocument } from '../../../../../functions/src/index';
import { doc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

const OAuthButtons:React.FC = () => {

    const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)
    const createUserDocument = async (user: User) => {
        const userDocRef =  doc(firestore, 'users', user.uid)
        await setDoc(userDocRef, user);
    }

    useEffect(()=> {
        if (userCred) {
            createUserDocument(JSON.parse(JSON.stringify(userCred.user)))
        }
    }, [userCred])

    return (
        <Flex flexDirection='column' width='100%' mb={4}>
            <Button  
            variant='oauth' 
            mb={2} isLoading={loading} 
            onClick={()=>{signInWithGoogle()}}>
                <Image src ='/images/googlelogo.png' height='20px' mr={4}></Image>
                Continue with Google
            </Button>
            
            <Button variant='oauth'>Some other provider</Button>
            <Text>{error && FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}</Text>
        </Flex>
    )
}

export default OAuthButtons;