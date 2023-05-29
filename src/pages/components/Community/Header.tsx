import { Community } from '@/atoms/communitiesAtom';
import { Flex, Box, Icon, Image, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { FaReddit } from 'react-icons/fa'
import useCommunityData from '@/hooks/useCommunityData';
import { communityState } from '../../../atoms/communitiesAtom';

type HeaderProps = {
    communityData: Community;
};

// The header will render content specific to a community 
const Header: React.FC<HeaderProps> = ({ communityData }) => {

    const {communityStateValue, onJoinOrLeaveCommunity, loading} = useCommunityData();

    const isJoined = !!communityStateValue.mySnippets.find(item =>
         item.communityId === communityData.id);

    return (
        <Flex direction='column' width='100%' height='146px'>
            <Box height='50%' bg='blue.400'></Box>
            <Flex justify='center' bg='white' flexGrow={1}>
                <Flex width='95%' maxWidth='860px'>
                    {communityStateValue.currentCommunity?.imageURL  ?
                        (<Image 
                            src={communityStateValue.currentCommunity.imageURL}
                            boxSize='66px'
                            alt='custom community image'
                            position='relative'
                            borderRadius='full'
                            top={-3}
                            color='blue.500'
                            border='4px solid white'
                        />)
                        :
                        (<Icon
                            as={FaReddit}
                            fontSize={64}
                            position='relative'
                            top={-5} color='blue.500'
                            border='4px solid white' borderRadius='full' />
                        )}
                    <Flex padding='10px 16px'>
                        <Flex direction='column' mr={6}> 
                            <Text fontWeight={800} fontSize='16pt'>{communityData.id}</Text>
                            <Text fontWeight={600} fontSize='16pt' color='gray.400'>r/{communityData.id}</Text>
                        </Flex>
                    </Flex>

                    <Button 
                    variant ={isJoined ? 'outline' : 'solid'} 
                    height='30px'
                    mt={4}
                    pr={6}pl={6} 
                    isLoading={loading}
                    onClick={()=>onJoinOrLeaveCommunity(communityData, isJoined)}>
                        {isJoined ? 'Joined' : 'Join'}
                    </Button>
                </Flex>
            </Flex>

        </Flex>
    )
}
export default Header;