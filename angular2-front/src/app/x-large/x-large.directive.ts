import {
  Directive, Renderer,
  ElementRef, Input
} from '@angular/core';

@Directive({ selector: '[x-large]' })
export class XLargeDirective {

  private cssPropValue: string = 'x-large';
  private cssPropName: string = 'fontSize';

  constructor(private element: ElementRef, private renderer: Renderer) { }

  @Input('x-large') set xLarge(setStyle: boolean) {
    let style: string = setStyle ? this.cssPropValue : null;
    this.renderer.setElementStyle(this.element.nativeElement, this.cssPropName, style);
  }
}
