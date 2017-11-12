import { Component, Input, OnInit } from "@angular/core";
import { Details } from './details'

import { DetailService } from './detail.service';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';


import 'rxjs/add/operator/switchMap';




@Component({
    selector: 'detail-details',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {

    constructor(private detailService: DetailService, private route: ActivatedRoute, private location: Location) { }

    @Input() detail: Details;

    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) =>
            this.detailService.getDetail(params.get('id'))).subscribe(det => this.detail = det);
    }

    goBack(): void {
        this.location.back();
      }

}