import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../share/shared.module';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {ContactComponent} from './contact/contact.component';
import {SearchComponent} from './search/search.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { SeaComponent } from './sea/sea.component';
import {ChemicalScreeningComponent} from "./chemical-screening/chemical-screening.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
    SearchComponent,
    PageNotFoundComponent,
    SeaComponent,
    ChemicalScreeningComponent
  ],
  exports: [
    HomeComponent,
    HelpComponent,
    ContactComponent,
    SearchComponent,
    PageNotFoundComponent,
    SeaComponent,
    ChemicalScreeningComponent
  ]
})

export class PageModule { }
