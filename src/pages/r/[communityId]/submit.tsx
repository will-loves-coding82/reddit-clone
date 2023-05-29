import PageContent from '@/pages/components/Layout/PageContent';
import React from 'react';
import {Box, Text} from '@chakra-ui/react';
import NewPostForm from '@/pages/components/Posts/NewPostForm';
import { auth } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import { communityState } from '@/atoms/communitiesAtom';
import { useRecoilValue } from 'recoil';

const SubmitPostPage:React.FC= () => {
    const [user] = useAuthState(auth)
    const communityStateValue = useRecoilValue(communityState);
    return (
        <PageContent>
            <>
            <Box p='14px 0px' borderBottom='1px solid' borderColor='white'> 
                <Text>
                    Create a post
                </Text>
            </Box>
            {user && <NewPostForm user={user} />}
            </>
            
            <>About</>
        </PageContent>
    )
}
export default SubmitPostPage;