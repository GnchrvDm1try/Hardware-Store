import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  private static readonly MIN_SEARCH_LENGTH: number = 2;
  private readonly router: Router;
  searchValue: string = '';

  get MIN_SEARCH_LENGTH() {
    return SearchBarComponent.MIN_SEARCH_LENGTH;
  }

  constructor(router: Router, searchService: SearchService) {
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
