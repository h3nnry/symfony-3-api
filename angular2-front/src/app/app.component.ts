/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { ProductService } from './products/product.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav class="navbar navbar-toggleable-md navbar-light">
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" [routerLink]="['/']">
        <img class="d-inline-block align-top" style="width: 20px; height:20px;" src="{{angularclassLogo}}" alt="Logo">
        Angular
      </a>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <!--<a class="navbar-brand" [routerLink]="['/']">
          <img class="d-inline-block align-top" style="width: 20px; height:20px;" src="{{angularclassLogo}}" alt="Logo">
          AngularBlog
        </a>-->
        <ul class="navbar-nav mr-auto mt-2 mt-md-0">
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/">Index</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/home">Home</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/detail">Detail</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/about">About</a>
          </li>
          <li class="nav-item" routerLinkActive="active">
            <a class="nav-link" routerLink="/product-list">Product List</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <a class="btn btn-success btn-sm nav-link-write" routerLink="/login" >Login</a>
        </form>
      </div>
    </nav>
    <div class="container">

      <main>
            <router-outlet></router-outlet>
      </main>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
        <span>WebPack Angular 2 Starter by <a [href]="url">@AngularClass</a></span>
        <div>
          <a [href]="url">
            <img [src]="angularclassLogo" width="25%">
          </a>
        </div>
      </footer>
    </div>  
  `,
  providers: [ProductService]
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
