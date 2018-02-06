import {NgModule} from '@angular/core';
import {SharedModule} from '../../share/shared.module';
import {ContainerModule} from '../container/container.module';
import {DrugRoutingModule} from './drug-routing.module';
import {DrugListComponent} from './drug-list/drug-list.component';
import {DrugForTargetComponent} from './drug-for-target/drug-for-target.component';
import {DrugDetailComponent} from './drug-detail/drug-detail.component';
import {CardModule} from '../../share/card/card.module';

@NgModule({
  imports: [
    SharedModule,
    ContainerModule,
    CardModule,
    DrugRoutingModule,
  ],
  declarations: [
    DrugListComponent,
    DrugDetailComponent,
    DrugForTargetComponent,
  ]
})
export class DrugModule { }
