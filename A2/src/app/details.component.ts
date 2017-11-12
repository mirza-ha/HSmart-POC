import { Component, OnInit } from '@angular/core';
import { Details } from './details'
import { DetailService } from './detail.service'
import { Router } from '@angular/router'

@Component({
  selector: 'my-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit {

  constructor(private detailService: DetailService, private router: Router) { }

  title = 'details';
  details: Details = { detail1 : "Some detail 1", detail2 : "Some detail 2", selected: false }
  detailsArray : Details[];
  selectedDetails: Details;

  onSelect(detail: Details): void {
    this.selectedDetails = detail;
    this.title = detail.detail1;
  }


  getDetails(): void
  {
    this.detailService.getDetails().then(details => this.detailsArray = details);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedDetails.detail1]);
  }


  ngOnInit(): void
  {
    this.getDetails();
  }
}
