import {
    ProductActionTypes,
    LoadProducts,
    LoadProductsSuccess,
    LoadProductsFail,
    UpdateProduct,
    UpdateProductSuccess,
    UpdateProductFail,
    CreateProduct,
    CreateProductFail,
    CreateProductSuccess,
    DeleteProduct,
    DeleteProductFail,
    DeleteProductSuccess,
} from './product.actions';
import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { Product } from '../product';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) {}
    LoadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActionTypes.LoadProducts),
            mergeMap((action: LoadProducts) =>
                this.productService
                    .getProducts()
                    .pipe(
                        map((products: Product[]) => new LoadProductsSuccess(products)),
                        catchError((err) => of(new LoadProductsFail(err))),
                    ),
            ),
        ),
    );

    UpdateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActionTypes.UpdateProduct),
            map((action: UpdateProduct) => action.payload),
            mergeMap((product) =>
                this.productService
                    .updateProduct(product)
                    .pipe(
                        map((product: Product) => new UpdateProductSuccess(product)),
                        catchError((err) => of(new UpdateProductFail(err))),
                    ),
            ),
        ),
    );

    CreateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActionTypes.CreateProduct),
            map((action: CreateProduct) => action.payload),
            mergeMap((product) =>
                this.productService
                    .createProduct(product)
                    .pipe(
                        map((product: Product) => new CreateProductSuccess(product)),
                        catchError((err) => of(new CreateProductFail(err))),
                    ),
            ),
        ),
    );

    DeleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActionTypes.DeleteProduct),
            map((action: DeleteProduct) => action.payload),
            mergeMap((product) =>
                this.productService.deleteProduct(product.id).pipe(
                    map(() => {
                        return new DeleteProductSuccess(product);
                    }),
                    catchError((err) => of(new DeleteProductFail(err))),
                ),
            ),
        ),
    );
}
