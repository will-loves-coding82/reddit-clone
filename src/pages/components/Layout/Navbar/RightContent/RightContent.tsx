import { Flex } from '@chakra-ui/react'
import React from 'react'
import AuthButtons from './AuthButtons'
import AuthModal from '@/pages/components/Modal/Auth/AuthModal'
type RightContentProps = {}

const RightContent:React.FC<RightContentProps> = () => {
    return(
        <>
            <AuthModal />
            <Flex justify ='center' align='center'>
                <AuthButtons/> 
            </Flex>
            
        </>
    )
}

export default RightContent;