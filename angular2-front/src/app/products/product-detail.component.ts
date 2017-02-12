import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
    // moduleId: module.id,
    templateUrl: 'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    id: number;

    constructor(private _route: ActivatedRoute, private _router: Router) {
        console.log(this._route.snapshot.params['id']);
    }

    ngOnInit() {
        let id =this._route.snapshot.params["id"];
        this.pageTitle += `: ${id}`;
        // console.log(productId);
        //this.productService.getProducts();
    }

    onBack(): void {
        this._router.navigate(['/product-list']);
    }
}