import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SearchService } from "../../../services/search.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  private static readonly MIN_SEARCH_LENGTH: number = 2;
  private readonly router: Router;
  private readonly searchService: SearchService;
  searchValue: string = '';
  resultProducts: any = [];

  get MIN_SEARCH_LENGTH() {
    return SearchBarComponent.MIN_SEARCH_LENGTH;
  }

  constructor(router: Router, searchService: SearchService) {
    this.router = router;
    this.searchService = searchService;
  }

  ngOnInit(): void {
  }

  search() {
    this.router.navigate(
      ['Search/'],
      {queryParams: {'value': this.searchValue}}
    );
  }

  previewSearch(searchValue: string) {
    setTimeout(() => {
      if (searchValue.length >= this.MIN_SEARCH_LENGTH && searchValue === this.searchValue)
        this.searchService.search(this.searchValue).subscribe((products: any) => this.resultProducts = products)
      else
        this.resultProducts = [];
    }, 750);
  }
}
