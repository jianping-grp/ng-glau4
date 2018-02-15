import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContactRoutingModule} from './contact-routing.module';
import {ContactComponent} from './contact/contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PhoneNumberValidationDirective} from './contact/mobile.validation';

@NgModule({
  declarations: [ContactComponent, PhoneNumberValidationDirective],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class ContactModule {

}
