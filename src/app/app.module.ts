import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './layout/page/home/home.component';
import {SearchComponent} from './layout/page/search/search.component';
import {HelpComponent} from './layout/page/help/help.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './share/shared.module';
import {PageNotFoundComponent} from './layout/page/page-not-found/page-not-found.component';
import {PageModule} from "./layout/page/page.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PageModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
