import {atom} from 'recoil';


// This is very similar to React's useHooks for state instantiation
// except an atom will allow other component to access the authmodal's state
// when paired with recoil
export interface AuthModalState {
    open: boolean;
    view: 'login' | 'signup' | 'resetPassword';
}


// define the default state
const defaultModalState: AuthModalState = {
    open: false,
    view:'login'
}


export const authModalState = atom<AuthModalState>({
    key:'authModalState',
    default: defaultModalState,
})