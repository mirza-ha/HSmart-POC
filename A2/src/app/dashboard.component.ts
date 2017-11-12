import { Component, OnInit } from '@angular/core';
import { DetailService } from './detail.service';
import { Details } from './details';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit { 

    constructor(private detailService: DetailService) { }

    details: Details[];

    ngOnInit(): void
    {
        //this.detailService.getDetails().then(det => this.details = det.slice(1,5));
        this.detailService.getTop(4).then(det => this.details = det);
    }

}