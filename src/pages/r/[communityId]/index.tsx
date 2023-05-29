import { Community, communityState } from '@/atoms/communitiesAtom';
import { firestore } from '@/firebase/clientApp';
import About from '@/pages/components/Community/About';
import Header from '@/pages/components/Community/Header';
import CommunityNotFound from '@/pages/components/Community/NotFound';
import PageContent from '@/pages/components/Layout/PageContent';
import CreatePostLink from '@/pages/components/Modal/Auth/Community/CreatePostLink';
import Posts from '@/pages/components/Posts/Posts';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import safeJsonStringify from 'safe-json-stringify'


type CommunityPageProps = {
    communityData: Community
};

// This client side component will read in the props provided by next js server
 const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {

    const setCommunityStateValue = useSetRecoilState(communityState)
    if(!communityData) {
        return(
            <CommunityNotFound/>
        )
    }

    useEffect(() => {
        setCommunityStateValue( prev => ({
            ...prev,
            currentCommunity: communityData,
        }))
    })
    return (
        <>
            <Header communityData={communityData} />
            <PageContent>
                <>
                <CreatePostLink/>
                <Posts communityData ={communityData}/>

                </>
                <>
                <About  communityData ={communityData}/>
                </>
            </PageContent>
        </>
    )
}

/* getServerSideProps will grab the data from the next js server and use that data to update this
  component before it is rendered to the user. Here we invoke this function call by passing in the
  the context which will allow us to access the page router when the user makes a page transition request
  to a community /r/communityName. 
  */
export async function getServerSideProps(context: GetServerSidePropsContext) {
    // get community data and pass it to client

    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef)

        /* Now that we have the communityDoc we then want to update our communityData props so
            we pass in a new object with the updated data
         */
        return {
            props: {

                // this object represents the community data that holds the id, and the rest of the data 
                communityData: communityDoc.exists() ? 
                JSON.parse(safeJsonStringify({id: communityDoc.id, ...communityDoc.data()})) 
                : "",
            },
        };

    }
    catch (error) {
        console.log('getServerSideProps error', error)
    }
}


export default CommunityPage;
