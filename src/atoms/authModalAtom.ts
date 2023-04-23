import {atom} from 'recoil';


// This is very similar to React's useHooks for state instantiation
export interface AuthModalState {
    open: boolean;
    view: 'login' | 'signup' | 'resetPassword';
}

const defaultModalState: AuthModalState = {
    open: false,
    view:'login'
}

export const authModalState = atom<AuthModalState>({
    key:'authModalState',
    default: defaultModalState,
})