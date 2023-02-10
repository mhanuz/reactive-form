import { AbstractControl, ValidatorFn } from "@angular/forms";

export function NameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: boolean} | null => {
        if(control.value !== null){
            if(control.value.length >= 11) {
                return {'NameNotAllowed': true}
            }
            return null;
        }else{
            return null
        }
        
    }
}