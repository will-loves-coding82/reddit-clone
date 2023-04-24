import { Flex, Button, Menu } from '@chakra-ui/react';
import React from 'react'
import AuthButtons from './AuthButtons'
import AuthModal from '@/pages/components/Modal/Auth/AuthModal'
import {signOut, User} from 'firebase/auth';
import { auth } from '@/firebase/clientApp';
import Icons from './Icons'
import UserMenu from './UserMenu';

type RightContentProps = {
    // ? means optional
    user?: User | null;
}

const RightContent:React.FC<RightContentProps> = ({user}) => {
    return (
        <>
            <AuthModal />
            <Flex justify ='center' align='center'>
                {user ? <Icons/>:<AuthButtons/>} 
                <UserMenu user={user}/>
            </Flex>
            
        </>
    )
}

export default RightContent;