import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../share/shared.module';
import {ContainerModule} from '../container/container.module';
import {CardModule} from '../../share/card/card.module';
import {TargetRoutingModule} from './target.routing.module';
import {TargetListComponent} from './target-list/target-list.component';
import {TargetDetailComponent} from './target-detail/target-detail.component';
import {TargetPredictionComponent} from './target-prediction/target-prediction.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContainerModule,
    CardModule,
    TargetRoutingModule
  ],
  declarations: [
    TargetListComponent,
    TargetDetailComponent,
    TargetPredictionComponent
  ]
})
export class TargetModule { }
