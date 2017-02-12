import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector: 'pm-products',
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.scss']
})
export class ProductListComponent {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 50;
    showImage: boolean = false;
    listFilter: string/* = 'cart'*/;
    products: IProduct[];
    errorMessage: string;
    public localState: any;

  constructor(
    public route: ActivatedRoute,
    private _productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this._productService.getProducts()
    .subscribe(
        products => this.products = products,
        error => this.errorMessage = <any>error
    )
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
  }
}