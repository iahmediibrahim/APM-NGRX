import { Product } from './../product';
import { Action } from '@ngrx/store';

// 1- create action types constants with Enum
export enum ProductActionTypes {
    ToggleProductCode = '[Product] Toggle Product Code',
    SetCurrentProduct = '[Product] Set Current Product',
    ClearCurrentProduct = '[Product] Clear Current Product',
    InitializeCurrentProduct = '[Product] Initialize Current Product',
    LoadProducts = '[Product] Load Products',
    LoadProductsSuccess = '[Product] Load Products Success',
    LoadProductsFail = '[Product] Load Products Fail',
}

// 2- create action creators for each action type
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) {}
}
export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor(public payload: Product) {}
}
export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}
export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}
export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LoadProducts;
}
export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LoadProductsSuccess;
    constructor(public payload: Product[]) {}
}

export class LoadProductsFail implements Action {
    readonly type = ProductActionTypes.LoadProductsFail;
    constructor(public payload: string) {}
}
// 3- expose all actions by exporting its union type
export type ProductActions =
    | ToggleProductCode
    | SetCurrentProduct
    | ClearCurrentProduct
    | InitializeCurrentProduct
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail;
