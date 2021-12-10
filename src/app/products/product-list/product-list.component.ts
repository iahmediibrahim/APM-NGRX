import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Subscription, takeWhile, Observable } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from '../product-store/product.reducer';
import {
    ToggleProductCode,
    SetCurrentProduct,
    InitializeCurrentProduct,
    LoadProducts,
} from './../product-store/product.actions';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css' ],
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    errorMessage$: Observable<string>;

    displayCode$: Observable<boolean>;

    products$: Observable<Product[]>;

    // Used to highlight the selected product in the list
    selectedProduct: Product | null;
    componentActive = true;

    constructor(private store: Store<fromProduct.State>) {}

    ngOnInit(): void {
        this.store.dispatch(new LoadProducts());
        this.store
            .pipe(select(fromProduct.getCurrentProduct), takeWhile(() => this.componentActive))
            .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

        this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
        this.products$ = this.store.pipe(select(fromProduct.getProducts));
        this.displayCode$ = this.store.pipe(select(fromProduct.getShowProductCode));
    }

    ngOnDestroy(): void {
        this.componentActive = false;
    }

    checkChanged(value): void {
        this.store.dispatch(new ToggleProductCode(value));
    }

    newProduct(): void {
        this.store.dispatch(new InitializeCurrentProduct());
    }

    productSelected(product: Product): void {
        this.store.dispatch(new SetCurrentProduct(product));
    }
}
