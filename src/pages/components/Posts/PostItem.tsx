import { Post } from '@/atoms/postsAtom';
import { Flex, Icon, Stack, Text, Image, Skeleton, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { BsChat } from 'react-icons/bs';
import { IoArrowDownCircleOutline, IoArrowDownCircleSharp, IoArrowRedoOutline, IoArrowUpCircleOutline, IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5';
import { DeleteIcon } from '@chakra-ui/icons';
type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDeletePost: (post: Post) => Promise<boolean>;
    onSelectPost: () => void;

};

const PostItem: React.FC<PostItemProps> = ({ post, userIsCreator, userVoteValue, onVote, onSelectPost, onDeletePost }) => {
    const [loadingImage, setLoadingImage] = useState(true);
    const [error, setError] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)


    const handleDelete = async () => {
        setLoadingDelete(true)
        console.log('called handleDelete')
        try {
            const success = await onDeletePost(post);
            if (!success) {
                throw new Error("Failed to delete post")
            }
            console.log("Post was deleted!")
        }
        catch (error: any) {
            setError(error.message)
        }
        setLoadingDelete(false)
    }


    return (
        <Flex
            border='1px solid'
            bg='white'
            borderColor='gray.300'
            borderRadius={4}
            _hover={{ borderColor: 'gray.500' }}
            cursor='pointer'
            onClick={onSelectPost}
            mb={2}
        >
            <Flex direction='column' align='center' bg='gray.100' p={2} width='40px' borderRadius={4}>
                <Icon
                    as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
                    fontSize={22}
                    cursor='pointer'
                    onClick={onVote}
                />
                <Text fontSize='9pt'>{post.votesStatus}</Text>
                <Icon
                    as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
                    fontSize={22}
                    cursor='pointer'
                    onClick={onVote}
                />
            </Flex>
        

            <Flex direction='column' width='100%'>
                {error && (
                    <Alert status='error'>
                        <AlertIcon/>
                        <Text mr={2}>{error}</Text>
                    </Alert>
                )}
                <Stack spacing={1} p='10px'>
                    <Stack direction='row' spacing={0.6} align='center' fontSize='9pt'>
                        <Text>Posted by u/{post.creatorDisplayName} {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}</Text>
                    </Stack>

                    <Text fontSize='12pt' fontWeight={600}>{post.title}</Text>
                    <Text fontSize='10pt'>{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify='center' align='center' p={2}>
                            {loadingImage &&
                                <Skeleton height='200px' width='100%' borderRadius={4} />
                            }
                            <Image src={post.imageURL} maxHeight='460px' alt='Post Image' display={loadingImage ? 'none' : 'unset'} onLoad={() => setLoadingImage(false)} />
                        </Flex>
                    )}
                </Stack>

                <Flex ml={1} mb={0.5} color='gray.500'>
                    <Flex align='center' p='8px 10px' borderRadius={4} _hover={{ bg: 'gray.200' }} cursor='pointer'>
                        <Icon as={BsChat} mr={2} />
                        <Text fontSize='9pt'>{post.numberofComments}</Text>
                    </Flex>

                    <Flex align='center' p='8px 10px' borderRadius={4} _hover={{ bg: 'gray.200' }} cursor='pointer'>
                        <Icon as={IoArrowRedoOutline} mr={2} />
                        <Text fontSize='9pt'>Share</Text>
                    </Flex>

                    <Flex align='center' p='8px 10px' borderRadius={4} _hover={{ bg: 'gray.200' }} cursor='pointer'>
                        <Icon as={IoBookmarkOutline} mr={2} />
                        <Text fontSize='9pt'>Save</Text>

                    </Flex>

                    {/* Onlythe user who made the post can delete it */}
                    {userIsCreator && (
                    
                        <Flex onClick={handleDelete} align='center' p='8px 10px' borderRadius={4} _hover={{ bg: 'gray.200' }} cursor='pointer'>
                            {loadingDelete ? ( 
                                <Spinner size='sm'/>
                            ): (

                                <>
                                    <Icon as={DeleteIcon} mr={2} />
                                    <Text fontSize='9pt'>Delete</Text>
                                </>
                            )}
                           
                        </Flex>
                    )}

                </Flex>
            </Flex>


        </Flex>
    )
}
export default PostItem;