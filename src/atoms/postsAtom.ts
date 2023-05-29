import { Timestamp } from 'firebase/firestore';
import {atom} from 'recoil';

export type Post = {
    id:string;
    communityId: string;
    creatorId: string;
    creatorDisplayName: string;
    title:string;
    body:string;
    numberofComments: number;
    votesStatus: number;
    imageURL?: string;
    communityImageeURL?: string;
    createdAt: Timestamp;

}


interface PostState {
    selectedPost: Post | null;
    // all the posts in the community
    posts: Post[];

}


const defaultPostState: PostState = {
    selectedPost: null,
    posts: []
}

export const postState = atom<PostState>({
    key:'postState',
    default: defaultPostState,
})