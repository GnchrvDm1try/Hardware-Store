import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SearchService } from "../../services/search.service";

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  private readonly route: ActivatedRoute;
  private readonly searchService: SearchService;
  products: any;
  value: string = '';

  constructor(route: ActivatedRoute, searchService: SearchService) {
    this.route = route;
    this.searchService = searchService;
    this.route.queryParams.subscribe(params => this.value = params.value);
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.searchService.search(this.value).subscribe(products => this.products = products);
  }
}
