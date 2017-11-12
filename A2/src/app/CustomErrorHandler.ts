import {ErrorHandler} from '@angular/core';
import {ComunnicationError} from './ComunnicationError';
 
export class CustomErrorHandler1 extends ErrorHandler {
    constructor(){
        super(false);
    }
 
    public handleError(error: any): void {
        if(error.originalError instanceof ComunnicationError){
            console.info("ABCDE");
        } else {
            super.handleError(error);
        }
    }
}