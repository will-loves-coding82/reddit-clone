import { Flex, Icon, Box } from "@chakra-ui/react";
import React from "react";
import { BsArrowRightCircle, BsArrowUpRightCircle, BsChatDots } from 'react-icons/bs'
import {GrAdd} from 'react-icons/gr'
import {
    IoFilterCircleOutline,
    IoNotificationsOutline,
    IoVideocamOutline,
} from 'react-icons/io5';



const Icons: React.FC = () => {

    return (
        <Flex>
            <Flex
                display={{ base: 'none', md: 'flex' }}
                align='center'
                borderRight='1px solid'
                borderColor='gray.200'
                >
                    
                <Flex >
                    <Icon
                        as={BsArrowRightCircle}
                        mr={1.5}
                        ml={1.5}
                        padding={1}
                        cursor='pointer'
                        borderRadius={4}
                        fontSize={25}
                        _hover={{ bg: 'gray.200' }}
                    ></Icon>
                </Flex>

                <Flex>
                    <Icon
                        as={IoFilterCircleOutline}
                        fontSize={27}
                        mr={1.5}
                        ml={1.5}
                        padding={1}
                        cursor='pointer'
                        borderRadius={4}
                        _hover={{ bg: 'gray.200' }}
                    ></Icon>
                </Flex>

                <Flex>
                    <Icon
                        as={IoVideocamOutline}
                        fontSize={27}
                        mr={1.5}
                        ml={1.5}
                        padding={1}
                        cursor='pointer'
                        borderRadius={4}
                        _hover={{ bg: 'gray.200'}}
                    ></Icon>
                </Flex>
            </Flex>

            {/* The below content will always appear on screen */}
            <>
                <Flex>
                    <Icon
                        as={BsChatDots}
                        fontSize={25}
                        mr={1.5}
                        ml={1.5}
                        padding={1}
                        cursor='pointer'
                        borderRadius={4}
                        _hover={{ bg: 'gray.200' }}
                    ></Icon>
                </Flex>

                <Flex>
                    <Icon 
                    as={IoNotificationsOutline}
                    display={{base:'none',md:'flex'}}
                    fontSize={25}
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor='pointer'
                    borderRadius={4}
                    _hover={{bg:'gray.200'}}
                    ></Icon>
                </Flex>

                <Flex>
                    <Icon 
                    as={GrAdd}
                    fontSize={25}
                    mr={1.5}
                    ml={1.5}
                    padding={1}
                    cursor='pointer'
                    borderRadius={4}
                    _hover={{bg:'gray.200'}}
                    ></Icon>
                </Flex>


            </>
        </Flex>
    )

}

export default Icons;