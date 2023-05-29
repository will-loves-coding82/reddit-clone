import { Community } from '@/atoms/communitiesAtom';
import { Post } from '@/atoms/postsAtom';
import { auth, firestore } from '@/firebase/clientApp';
import usePosts from '@/hooks/usePosts';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Stack } from '@chakra-ui/react';
import PostLoader from './PostLoader';

type PostsProps = {
    communityData: Community;
};

// once this component renders, we fetch posts from database and render them
const Posts:React.FC<PostsProps> = ({communityData}) => {
    // useAuthState
    const [loading, setLoading] = useState(false)
    const [user] = useAuthState(auth)
    
    const {postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost} = usePosts();

    const getposts = async () => {
        try {
            setLoading(true)
            const postsQuery = query(
                collection(firestore, 'posts'), 
                where('communityId', '==', communityData.id), 
                orderBy('createdAt', 'desc'))
            const postDocs = await getDocs(postsQuery)

            // store in the post's state
            const posts = postDocs.docs.map(doc =>({id: doc.id, ...doc.data()}))
            setPostStateValue(prev => ({
                ...prev,
                posts: posts as Post[],
            }))
            console.log('posts', posts)

        } catch(error:any) {
                console.log('getPosts error', error.message)
        }
        setLoading(false)
    }

    useEffect(()=> {
        getposts();
    },[])
    return (

        <>
        {loading ? (
            <PostLoader />
         ): (
        <Stack>
            {postStateValue.posts.map(item => 
            <PostItem 
            key={item.id}
            post={item} 
             userIsCreator={user?.uid === item.creatorId} 
            userVoteValue={undefined} 
            onVote={onVote}
            onSelectPost={onSelectPost}
            onDeletePost={onDeletePost}/>)}
        </Stack>
        )}

        
        </>
         
    )
            }
export default Posts;