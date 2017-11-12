import { Component, Input } from '@angular/core'
import { Details } from './details';

@Component({
    selector: 'table-cell1',
    template: `<div *ngIf="detail">
                    <h2> {{detail.detail1 }} details! </h2>
                    <div><label>Detail desc:</label> <div>{{detail.detail2}}</div></div>
                    <input [(ngModel)]="detail.detail2" placeholder="detail1">
                </div>`
})



export class TableCell1Component {

    @Input() detail:Details;
}

