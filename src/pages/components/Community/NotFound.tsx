import { Button, Flex, Link } from '@chakra-ui/react';
import React from 'react';

type CommunityNotFoundProps = {
    
};

const CommunityNotFound:React.FC<CommunityNotFoundProps> = () => {
    
    return (
        <Flex direction='column' justify='center' align='center' minHeight='60vh'>
                Sorry, that community does not exist or has been banned
                <Link href='/'>
                <Button mt={4}>GO HOME</Button>
                </Link>
        </Flex>
    )

}
export default CommunityNotFound;