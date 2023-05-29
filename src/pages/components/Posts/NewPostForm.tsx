import { Alert, AlertIcon, Flex, Text, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiPoll } from "react-icons/bi";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import TabItem from './TabItem';
import TextInput from './PostForm/TextInputs';
import ImageUpload from './PostForm/ImageUpload';
import { Post } from '@/atoms/postsAtom';
import { User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '@/firebase/clientApp';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import useSelectFile from '@/hooks/useSelectFile';

type NewPostFormProps = {
    user: User,
};

const formTabs = [
    {
        title: 'Post',
        icon: IoDocumentText
    },
    {
        title: 'Images & Video',
        icon: IoImageOutline
    },
    {
        title: 'Link',
        icon: BsLink45Deg
    },
    {
        title: 'Poll',
        icon: BiPoll
    },
    {
        title: 'Talk',
        icon: BsMic
    },

]

export type TabItem = {
    title: string;
    icon: typeof Icon.arguments;
}

const NewPostForm: React.FC<NewPostFormProps> = ({user}) => {

    const router = useRouter();

    const [selectedTab, setSelectedTab] = useState(formTabs[0].title)
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: "",
    })
    const {selectedFile, setSelectedFile, onSelectFile} = useSelectFile();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    const handleCreatePost = async () => { 
        const { communityId } = router.query;

        // construct the new post object which is type Post
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user.uid,
            // ! tells typescript that this will always be valid
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberofComments: 0,
            votesStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        }

        setLoading(true)

        // store the post in the firebase database
        try {
            // Specify a new collection called posts and add the document there 
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost)

            if (selectedFile) {
                // store in storage 
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`)
                await uploadString(imageRef, selectedFile, 'data_url')
                const downloadURL = await getDownloadURL(imageRef)

                // update the post Doc by adding imageURL
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                })
            }
        } catch(error:any) {
            setError(error)
            console.log('handleCreatePost error', error.message)
        }
        setLoading(false)

        // redirect user back to communityPage using next js router
        router.back()
        
    }


    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { target: { name, value } } = event;
        setTextInputs(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex >
                {formTabs.map((item) => (
                    <TabItem key={item.title} item={item} selected={item.title === selectedTab} setSelectedTab={setSelectedTab} />
                ))}
            </Flex>
            <Flex>
                <Flex p={4} width='100%'>
                    {selectedTab === 'Post' && (
                        <TextInput
                            textInputs={textInputs}
                            handleCreatePost={handleCreatePost}
                            onChange={onTextChange}
                            loading={loading} />
                    )}

                    {selectedTab === 'Images & Video' && (
                        <ImageUpload
                            selectedFile={selectedFile}
                            onSelectImage={onSelectFile}
                            setSelectedTab={setSelectedTab}
                            setSelectedFile={setSelectedFile}
                        />
                    )}
                </Flex>

            </Flex>
            {error && (
                <Alert status='error'>
                <AlertIcon />
                <Text mr={2}>Error creating post</Text>
              </Alert>
            )}            
        </Flex>
    )
}
export default NewPostForm;