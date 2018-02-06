import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ContactModule} from './contact/contact.module';
import {HomeComponent} from './home/home.component';

import {SearchComponent} from './search/search/search.component';
import {HelpComponent} from './help/help/help.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './share/shared.module';
import {DrugModule} from './data/drug/drug.module';
import {TargetModule} from './data/target/target.module';
import {PathwayModule} from './data/pathway/pathway.module';
import {MoleculeModule} from './data/molecule/molecule.module';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    SearchComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
