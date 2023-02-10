import { AbstractControl, ValidatorFn } from "@angular/forms";

// ValidatorFn: receive a control, if there is an error trigger the validator otherwise return null 
export function PhoneNumberValidation(): ValidatorFn {
    return(control: AbstractControl): {[key: string]: boolean}| null => {
        if(control.value !== null) {
            if(control.value.toString().length != 11){
                return {"NotElevenDigit": true}
            }else{
                return null
            }     
    }else{
        return null
    }
}
}