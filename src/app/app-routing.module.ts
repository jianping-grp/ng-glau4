import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './error/page-not-found/page-not-found.component';
import {SelectivePreloadingStrategy} from './selective-preloading-strategy';
import {HomeComponent} from './home/home.component';

import {SearchComponent} from './search/search/search.component';
import {HelpComponent} from './help/help/help.component';
import {PathwayListComponent} from './data/pathway/pathway-list/pathway-list.component';
import {DrugListComponent} from './data/drug/drug-list/drug-list.component';
import {DrugDetailComponent} from './data/drug/drug-detail/drug-detail.component';
import {TargetListComponent} from './data/target/target-list/target-list.component';
import {DrugForTargetComponent} from './data/drug/drug-for-target/drug-for-target.component';
import {TargetPredictionComponent} from './data/target/target-prediction/target-prediction.component';
import {TargetDetailComponent} from './data/target/target-detail/target-detail.component';
import {MoleculeListComponent} from './data/molecule/molecule-list/molecule-list.component';
import {MoleculeDrugComponent} from './data/molecule/molecule-drug/molecule-drug.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},

  {path: 'pathway',
  loadChildren: 'app/data/pathway/pathway.module#PathwayModule'},
  {path: 'drug-glau-treatment',
  loadChildren: 'app/data/drug/drug.module#DrugModule'
  },
  // {path: 'drug-glau-treatment', component: DrugListComponent},
  // {path: 'drug/:id', component: DrugDetailComponent},
  {path: 'target',
  loadChildren: 'app/data/target/target.module#TargetModule'},
  // {path: 'drug-for-target', component: DrugForTargetComponent},
  // {path: 'target/:chemblid', component: TargetDetailComponent},
  {path: 'molecule',
    loadChildren: 'app/data/molecule/molecule.module#MoleculeModule'
  },
  // {path: 'molecule-drug', component: MoleculeDrugComponent},


  // {path: 'target-prediction/:smiles', component: TargetPredictionComponent},

  // {path: 'search', loadChildren: 'app/search/search.module#SearchModule'},
  {path: 'help', component: HelpComponent},
  {path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule'},
  // {path: 'data-browse', loadChildren: 'app/data-browse/data-browse.module#DataBrowseModule',
  // data: {preload: true}},
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: SelectivePreloadingStrategy,
      }
    )
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})

export class AppRoutingModule {

}
