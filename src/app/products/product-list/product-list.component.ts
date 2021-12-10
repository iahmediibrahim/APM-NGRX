import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from '../product-store/product.reducer';
import { ToggleProductCode, SetCurrentProduct, InitializeCurrentProduct } from './../product-store/product.actions';

@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: [ './product-list.component.css' ],
})
export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle = 'Products';
    errorMessage: string;

    displayCode: boolean;

    products: Product[];

    // Used to highlight the selected product in the list
    selectedProduct: Product | null;
    sub: Subscription;

    constructor(private productService: ProductService, private store: Store<fromProduct.State>) {}

    ngOnInit(): void {
        this.store
            .pipe(select(fromProduct.getCurrentProduct))
            .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

        this.productService.getProducts().subscribe({
            next: (products: Product[]) => (this.products = products),
            error: (err) => (this.errorMessage = err),
        });
        // TODO: Unsubscribe
        this.store
            .pipe(select(fromProduct.getShowProductCode))
            .subscribe((showProductCode) => (this.displayCode = showProductCode));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
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
