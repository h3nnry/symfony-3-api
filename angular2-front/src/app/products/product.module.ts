import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './products/produ.routes';

import { ProductListComponent } from './product-list.component';
import { ProductFilterPipe } from './product-filter-pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-guard.service';
import { ProductService } from './product.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductFilterPipe
    ],
    imports: [
        RouterModule,
        SharedModule,
        RouterModule.forChild([
             { path: 'product-details/:id', canActivate: [ ProductDetailGuard ], component: ProductDetailComponent },
             { path: 'product-list', component: ProductListComponent },
        ])
    ],
    providers: [
        ProductService,
        ProductDetailGuard
    ]
})
export class ProductModule {}