import { authModalState } from '@/atoms/authModalAtom';
import { Community, CommunitySnippet, communityState } from '@/atoms/communitiesAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { getDocs, collection, writeBatch, doc, increment } from 'firebase/firestore';
import React, { useEffect } from 'react';
import {useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';


// This is a hook
const useCommunityData = () => {
    const [user]  = useAuthState(auth)
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [loading, setLoading ] = useState(false);
    const [error, setError] = useState('')
    const setAuthModalstate = useSetRecoilState(authModalState)

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        
        if(!user) {
            setAuthModalstate({open: true, view:'login'})
            return;
        }
        if (isJoined) {
            leaveCommunity(communityData.id)
            return;
        }
        joinCommunity(communityData)
    }

    // This will use batchWrites to update the firestore documents
    const joinCommunity = async (communityData: Community) => {

        // creating a new community snippet for the current user. 
        try {
            const batch = writeBatch(firestore);
            const newSnippet : CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || ''
            }

            // write the new snippet to the user and update the community size by +1
            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet)
            batch.update(doc(firestore, 'communities', communityData.id), {numberOfMembers: increment(1)})
            await batch.commit()

            // update the recoil state for this hook component so that it appends the new communitySnippet
            // to the list of snippets for this user
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }))}
        catch(error:any) {
            console.log('join community error', error);
            setError(error.message)
        }
    }

    const leaveCommunity =  async (communityId: string)=> {
        // removing the community snippet from the user
        try {
            const batch = writeBatch(firestore);
            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId))
            // update the number of members 
            batch.update(doc(firestore, 'communities', communityId), {numberOfMembers: increment(-1)})
            await batch.commit()
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item=> item.communityId !== communityId)
            }))
        }
        catch(error:any) {
            console.log('join community error', error);
            setError(error.message)
        }
    }

    // As soon as we detect a user, we want to grab all their current snippets and this will 
    // happen behind the scenes automatically!
    useEffect (()=>{
        if(!user) {
            return;
        }
        getMySnippets();
    }, [user])


    const getMySnippets = async () => {
        setLoading(true)
        try {
            // Grab a collection of snippets from the user's communitySnippets
            const snippetDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`))
            const snippets = snippetDocs.docs.map(doc=> ({...doc.data()}))
            setCommunityStateValue((prev)=> ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[]
            }))
            console.log(communityStateValue.mySnippets)
        }

        catch(error:any) {
            console.log(error)
            setError(error.message)
        }

        setLoading(false)
    }

    return {
        // an object that contains data and functions
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}
export default useCommunityData;