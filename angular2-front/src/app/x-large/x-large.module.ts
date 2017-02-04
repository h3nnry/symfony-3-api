import { NgModule } from '@angular/core';

import { XLargeDirective } from './x-large.directive';

@NgModule({
  declarations: [ XLargeDirective ],
  exports: [ XLargeDirective ]
})
export class XLargeModule { }
