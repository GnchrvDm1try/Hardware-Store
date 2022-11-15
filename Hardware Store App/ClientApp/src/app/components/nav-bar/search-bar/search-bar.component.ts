import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  private readonly router: Router;
  searchValue: string = '';

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(
      ['Search/'],
      {queryParams: {'value': this.searchValue}}
    );
  }
}
