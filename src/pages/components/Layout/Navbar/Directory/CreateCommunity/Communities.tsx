import React, { useState } from 'react';
import CreateCommunityModal from './CreateCommunityModal';
import { MenuItem, Flex, Icon } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type CommunitiesProps = {
    
};

const Communities:React.FC<CommunitiesProps> = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <CreateCommunityModal open={open} handleClose={()=>{setOpen(false)}}/>

            <MenuItem width='100%' fontSize='10pt' _hover={{bg:'gra.100'}} onClick={()=>{setOpen(true)}}>
            <Flex align='center'>
                <Icon fontSize='20pt' mr={2} as={GrAdd}></Icon>
                Create Community
            </Flex>
            </MenuItem>
        </>
    )
}
export default Communities;