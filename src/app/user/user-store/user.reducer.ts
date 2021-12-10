import { User } from './../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export const initialState: UserState = {
    maskUserName: true,
    currentUser: {
        id: null,
        userName: '',
        isAdmin: false,
    },
};
export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

const getUserFeatureState = createFeatureSelector<UserState>('user');
export const getMaskUserName = createSelector(getUserFeatureState, (state) => state.maskUserName);
export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'MASK_USER_NAME':
            console.log(state);
            console.log(action.payload);

            return { ...state, maskUserName: action.payload };

        default:
            return state;
    }
}
