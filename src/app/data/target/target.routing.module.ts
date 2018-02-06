import {RouterModule, Routes} from '@angular/router';
import {TargetListComponent} from './target-list/target-list.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {NgModule} from '@angular/core';
import {TargetPredictionComponent} from './target-prediction/target-prediction.component';

const routes: Routes = [
  {
    path: '',
    component: TargetListComponent
  },
  {
    path: ':chemblid',
    component: TargetDetailComponent
  },
  {
    path: 'target-prediction/:smiles',
    component: TargetPredictionComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TargetRoutingModule { }
