import { Component, OnInit } from '@angular/core'
import { DetailService } from './detail.service'
import { Router } from '@angular/router'
import { Details } from './details'



@Component({
    selector: 'master-table',
    templateUrl: './mastertable.component.html',
    styleUrls: ['./mastertable.component.css']
})

export class MasterTableComponent {
    constructor(private detailService: DetailService, private router: Router) { }

    color = 'accent';
    checked = false;
    disabled = false;
    shown = false;

    details: Details[];
    selectedDetail: Details;
    selectedDetails: Details[] = [{ detail1: "", detail2: "", selected: false }, { detail1: "", detail2: "", selected: false }];
    selectCount: number = 0;
    selectPosition: number = 0;

    turnOn(): void {
        if (!this.shown)
            this.getDetails();
        else 
            this.details=undefined;
    }

    getDetails(): void {
        this.detailService.getTop(5).then(dets => this.details = dets);
    }

    onSelect(detail: Details) {
        this.selectedDetail = detail;
        //alert(detail.detail1);

        this.selectedDetails[this.selectPosition] = detail;

        switch (this.selectPosition) {
            case 0: this.selectPosition = 1;
                break;
            case 1: this.selectPosition = 0;
                break;
            default: this.selectPosition = 0;
        }

        this.details.forEach(det => {
            if ((det === this.selectedDetails[0]) || (det === this.selectedDetails[1])) { det.selected = true }
            else { det.selected = false }
        })

        if (this.selectCount < 2) this.selectCount++;
    }

    clearSelection(): void { this.selectCount = 0; this.selectPosition = 0; }
}