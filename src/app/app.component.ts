import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl, FormArray,Validators} from '@angular/forms';
import { NameValidator } from './name-validator.directive';
import { PhoneNumberValidation} from './phone-number-validator.directive'

interface CustomerInfo {
    basicInfo: FormGroup<basicInfo>, 
    primaryAddress: FormGroup<primaryAddress>, 
    secondaryAddress: FormGroup<secondaryAddress>,
    hobbies:FormArray;
}
//formgroup: combines formcontrols into an object,formcontrol name is the key of object 
//formcontrol: contain data, value and validation information
//FormArray: add and remove formcontrol at runtime, combines values into an array
interface basicInfo{
  firstname: FormControl<string>,
  lastname: FormControl<string>,
  email?: FormControl<string>,
  phone: FormControl<number>
}
interface primaryAddress{
  email?: FormControl<string>,
  phone: FormControl<number>,
  address: FormControl<string>,
  city: FormControl<string>,
  country: FormControl<string>,
  postcode: FormControl<string | number>
}
interface secondaryAddress{
  email?: FormControl<string>,
  phone: FormControl<number>,
  address: FormControl<string>,
  city: FormControl<string>,
  country: FormControl<string>,
  postcode: FormControl<string | number>
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  signupForm: FormGroup<CustomerInfo>;
  primaryAddressCheckBoxValue: boolean;
  secondaryAddressCheckBoxValue: boolean;

  constructor( ){
  }
// ngOnInit: execute the code inside ngOnInit after class instantiated
  ngOnInit() {
  this.createCustomerForm();  
  this.primaryAddressCheckBoxValue = false;
  this.secondaryAddressCheckBoxValue = false;
  }

  createCustomerForm() {
    this.signupForm = new FormGroup<CustomerInfo>({
      basicInfo:  new FormGroup<basicInfo>({
      firstname: new FormControl('',{validators: [Validators.required, NameValidator()]}),
      lastname: new FormControl('',{validators: [Validators.required, NameValidator()]}),
      email: new FormControl('',Validators.email),
      phone: new FormControl(null, {validators: [Validators.required, PhoneNumberValidation()]} )
     }),
     primaryAddress: new FormGroup<primaryAddress>({
      email: new FormControl('',Validators.email ),
      phone: new FormControl(null, {validators: [Validators.required, PhoneNumberValidation()]}),
      address: new FormControl('',Validators.required),
     city: new FormControl('',Validators.required),
     country: new FormControl('',Validators.required),
     postcode: new FormControl(null,Validators.required)
     }),
     secondaryAddress: new FormGroup<secondaryAddress>({
       email: new FormControl('',Validators.email),
       phone: new FormControl(null, {validators: [Validators.required, PhoneNumberValidation()]}),
       address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('',Validators.required),
      postcode: new FormControl(null,Validators.required)
     }),
     hobbies: new FormArray([])
    })
  }

  copyBasicInfoIntoPrimaryAddress() {
    this.primaryAddressCheckBoxValue=!this.primaryAddressCheckBoxValue

    if (this.primaryAddressCheckBoxValue) {
      this.signupForm.controls.primaryAddress.controls.email.setValue(this.signupForm.controls.basicInfo.controls.email.value);
      this.signupForm.controls.primaryAddress.controls.phone.setValue(this.signupForm.controls.basicInfo.controls.phone.value);
    } else {
      this.signupForm.controls.primaryAddress.controls.email.setValue("");
      this.signupForm.controls.primaryAddress.controls.phone.setValue(null);
    }
  }

  copyPrimaryAddessIntoSecondaryAddress() {
    this.secondaryAddressCheckBoxValue=!this.secondaryAddressCheckBoxValue
    if (this.secondaryAddressCheckBoxValue) {
      this.signupForm.controls.secondaryAddress.controls.email.setValue(this.signupForm.controls.primaryAddress.controls.email.value)
      this.signupForm.controls.secondaryAddress.controls.phone.setValue(this.signupForm.controls.primaryAddress.controls.phone.value)
      this.signupForm.controls.secondaryAddress.controls.address.setValue(this.signupForm.controls.primaryAddress.controls.address.value)
      this.signupForm.controls.secondaryAddress.controls.city.setValue(this.signupForm.controls.primaryAddress.controls.city.value)
      this.signupForm.controls.secondaryAddress.controls.country.setValue(this.signupForm.controls.primaryAddress.controls.country.value)
      this.signupForm.controls.secondaryAddress.controls.postcode.setValue(this.signupForm.controls.primaryAddress.controls.postcode.value)
    } else {
        this.signupForm.controls.secondaryAddress.controls.email.setValue("")
        this.signupForm.controls.secondaryAddress.controls.phone.setValue(null)
        this.signupForm.controls.secondaryAddress.controls.address.setValue("")
        this.signupForm.controls.secondaryAddress.controls.city.setValue("")
        this.signupForm.controls.secondaryAddress.controls.country.setValue("")
        this.signupForm.controls.secondaryAddress.controls.postcode.setValue(null)
    }
  }

  onSubmit(){
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    }
    if (this.primaryAddressCheckBoxValue) {
      this.primaryAddressCheckBoxValue=false
    }
    if (this.secondaryAddressCheckBoxValue) {
      this.secondaryAddressCheckBoxValue=false
    }
    this.signupForm.reset();
  }

  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onClear(){
    this.signupForm.reset();
  }
}
