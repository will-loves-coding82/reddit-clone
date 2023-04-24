import { Flex, Button, Image, Text} from '@chakra-ui/react';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';
import {auth} from '../../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';

import React from 'react';

const OAuthButtons:React.FC = () => {

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth)

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