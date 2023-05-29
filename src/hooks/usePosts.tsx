import { Post, postState } from '@/atoms/postsAtom';
import { firestore, storage } from '@/firebase/clientApp';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React from 'react';
import { useRecoilState } from 'recoil';


// This hook will manage our post state atom for us behind the scenes
const usePosts = () => {
    
    const [postStateValue, setPostStateValue] = useRecoilState(postState)
    
    const onVote = async () => {

    }

    const onSelectPost = async () => {

    }

    const onDeletePost = async (post:Post): Promise<boolean>=> {
        console.log('called onDeletePost from usePosts.tsx')
        try{
            // check if post has image , delete if exists
            if(post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef)
            }
            // delete post document from firestore
            const postDocRef = doc(firestore, 'posts', post.id!)
            await deleteDoc(postDocRef);
            
            setPostStateValue(prev=> ({
                ...prev,
                posts: prev.posts.filter(item=> item.id !== post.id)
            }))


        }
        catch(error:any) {
            console.log('Delete Post error', error.message)
            return false;
        }
        return true;
    }
    return {
        postStateValue, 
        setPostStateValue, 
        onVote, 
        onSelectPost, 
        onDeletePost
    }
}
export default usePosts;