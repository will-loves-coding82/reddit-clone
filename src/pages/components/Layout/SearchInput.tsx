import { Flex, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import {SearchIcon} from "@chakra-ui/icons"
import * as React from 'react';


type SearchInputProps = {

};

const SearchInput: React.FC<SearchInputProps> = () => {
    return (
        // flexGrow tells the inputField to take up remaining space to the right
        // mr is marginRight
        <Flex flexGrow={1} mr = {5} align="center">
            <InputGroup >
                {/*LeftElement is a ChakraUI name for any content palced
                   to the left of an inputfield */}
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' mb={1}/>}
                />
                <Input  placeholder='Search Reddit' 
                        fontSize ="10pt"
                        margin="0 0 0 10"
                        /* _attr allows us to style some  */
                        _placeholder={{color:"gray.500"}}
                        _hover={{
                            bg:"white",
                            border:"1px solid",
                            borderColor:"blue.500"
                        }} 
                        _focus={{
                            outline:'none',
                            border:'1px solid',
                            borderColor:'blue.500'
                        }}
                        height = '34px'
                        bg='gray.50'/>
            </InputGroup>

        </Flex>
    )
} 

export default SearchInput;