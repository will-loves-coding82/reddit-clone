import { authModalState } from '@/atoms/authModalAtom'
import { Button, Flex } from '@chakra-ui/react'
import {useSetRecoilState} from 'recoil'
import React from 'react'


const AuthButtons:React.FC = () => {

    // we only care about setting the state of the modal 
    // Using this pattern of Recoil, we can pass information
    // to that component to tell it to update!
    const setAuthModalState = useSetRecoilState(authModalState)
    return(
        <>
        {/* variant is a chakra style attribute from button.tsx */}
        <Button 
        variant ='outline' height='28px' 
        width = {{base:'70px', md:'110px'}} 
        display={{base:'none',sm:'flex'}} 
        mr={2}
        onClick ={()=> {setAuthModalState({open:true, view:'login'})}}
        >Log In</Button>

        <Button 
        variant='solid' height='28px'
        width = {{base:'70px', md:'110px'}} 
        display={{base:'none',sm:'flex'}} 
        mr={2}
        onClick ={()=> {setAuthModalState({open:true, view:'signup'})}}

        >Sign Up</Button>

        </>
    )
}

export default AuthButtons;