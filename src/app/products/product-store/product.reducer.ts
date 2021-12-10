import { ProductActions, ProductActionTypes } from './product.actions';
import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// identifying the initial state of products
const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
};
// extending the Root state to add the lazy loaded products module state
export interface State extends fromRoot.State {
    products: ProductState;
}
// create interface for the returned state ( how the state of the Products should look like? )
export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
}

// create the main feature selector
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// create the selectors needed for each slice of the state of products needed individually
export const getShowProductCode = createSelector(getProductFeatureState, (state) => state.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, (state) => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, (state) => state.products);

// create the reducer function with strong typing by initial state and the interface of the return state
export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return { ...state, showProductCode: action.payload };
        case ProductActionTypes.SetCurrentProduct:
            return { ...state, currentProduct: { ...action.payload } };
        case ProductActionTypes.ClearCurrentProduct:
            return { ...state, currentProduct: null };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: '',
                    description: '',
                    starRating: 0,
                },
            };
        default:
            return state;
    }
}
