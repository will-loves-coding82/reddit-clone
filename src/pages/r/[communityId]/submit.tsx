import PageContent from '@/pages/components/Layout/PageContent';
import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import NewPostForm from '@/pages/components/Posts/NewPostForm';

const SubmitPostPage:React.FC= () => {
    
    return (
        <PageContent>
            <>
            <Box p='14px 0px' borderBottom='1px solid' borderColor='white'> 
                <Text>
                    Create a post
                </Text>
            </Box>
            <NewPostForm/>
            </>
            
            <>About</>
        </PageContent>
    )
}
export default SubmitPostPage;