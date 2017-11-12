import { Component, Input  } from '@angular/core';

@Component({
    selector: 'app-error',
    template: '<div *ngIf="errorDesc"><h3>{{ errorDesc }}</h3></div>'
})

export class ErrorComponent { 
    @Input() errorDesc: string;
}

