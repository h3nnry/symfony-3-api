import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: [ './about.component.scss' ]
})
export class AboutComponent implements OnInit {
  public about: any;

  constructor(protected route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data.forEach((data: {about: any}) => {
      this.about = data.about;
    });
  }
}
