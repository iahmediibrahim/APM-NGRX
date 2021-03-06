import { Action } from '@ngrx/store';

export enum UserActionTypes {
    MaskUserName = '[user] Mask User Name',
}

export class MaskUserName implements Action {
    readonly type = UserActionTypes.MaskUserName;
    constructor(public payload: boolean) {}
}

export type UserActions = MaskUserName;
