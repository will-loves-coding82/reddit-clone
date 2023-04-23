import React from 'react';
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from '../SearchInput'
import RightContent from './RightContent/RightContent'
// React.FC represents a Function Component
const Navbar: React.FC = () => {
    return (
        // flex is a div with css flexbox already applied to ti 

        <Flex bg="white" height='44px' padding='6px 12px'>

            <Flex align="center">
                <Image src="/images/redditFace.svg"
                    alt='reddit face logo'
                    width="30"
                    height="30" />

                {/*The display property object uses the keys 'base' and 'md' to specify 
                the display value for the element at different screen sizes.'base' sets the 
                display property to 'none' for screen sizes smaller than the medium (md) 
                breakpoint, which means the element is hidden on small screens.
                'md' sets the display property to 'unset' for screens that are at least 
                as wide as the medium breakpoint, which means the element is displayed on 
                medium and larger screens.*/}
                <Image src="/images/redditText.svg"
                    alt='reddit text logo'
                    width="55"
                    height="30"
                    display={{ base: 'none', md: 'unset' }}
                />
            </Flex>

            {/*    <Directory/>
            */}
            <SearchInput />
            <RightContent /> 
        </Flex>
    )

};

export default Navbar;
