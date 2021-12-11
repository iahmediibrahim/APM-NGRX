import { ProductActions, ProductActionTypes, LoadProductsSuccess } from './product.actions';
import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// identifying the initial state of products
const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: '',
};
// extending the Root state to add the lazy loaded products module state
export interface State extends fromRoot.State {
    products: ProductState;
}
// create interface for the returned state ( how the state of the Products should look like? )
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}
const defaultProduct = {
    id: 0,
    productName: '',
    productCode: '',
    description: '',
    starRating: 0,
};
// create the main feature selector
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// create the selectors needed for each slice of the state of products needed individually
export const getShowProductCode = createSelector(getProductFeatureState, (state) => state.showProductCode);
export const getCurrentProductId = createSelector(getProductFeatureState, (state) => state.currentProductId);
export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => {
        if (currentProductId === 0) {
            return defaultProduct;
        } else {
            return currentProductId ? state.products.find((p) => p.id === currentProductId) : null;
        }
    },
);
export const getProducts = createSelector(getProductFeatureState, (state) => state.products);
export const getError = createSelector(getProductFeatureState, (state) => state.error);

// create the reducer function with strong typing by initial state and the interface of the return state
export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return { ...state, showProductCode: action.payload };
        case ProductActionTypes.SetCurrentProduct:
            return { ...state, currentProductId: action.payload.id };
        case ProductActionTypes.ClearCurrentProduct:
            return { ...state, currentProductId: null };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0,
            };
        case ProductActionTypes.LoadProductsSuccess:
            return { ...state, products: action.payload, error: '' };
        case ProductActionTypes.LoadProductsFail:
            return { ...state, products: [], error: action.payload };
        case ProductActionTypes.UpdateProductSuccess:
            const products = state.products.map(
                (product) => (product.id === action.payload.id ? action.payload : product),
            );
            return { ...state, products, currentProductId: action.payload.id, error: '' };
        case ProductActionTypes.UpdateProductFail:
            return { ...state, products: [], error: action.payload };
        case ProductActionTypes.CreateProductSuccess:
            const newProducts = [ ...state.products, { ...action.payload } ];
            return { ...state, products: newProducts, currentProductId: action.payload.id, error: '' };
        case ProductActionTypes.CreateProductFail:
            return { ...state, error: action.payload };
        case ProductActionTypes.DeleteProductSuccess:
            const updatedProducts = state.products.filter((p) => p.id !== action.payload.id);
            return { ...state, products: updatedProducts, currentProductId: null, error: '' };
        case ProductActionTypes.DeleteProductFail:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}
