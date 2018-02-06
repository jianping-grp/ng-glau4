import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../share/shared.module';
import {CardModule} from '../../share/card/card.module';
import {PathwayRoutingModule} from './pathway.routing.module';
import {ContainerModule} from '../container/container.module';
import {PathwayListComponent} from './pathway-list/pathway-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CardModule,
    ContainerModule,
    PathwayRoutingModule,
  ],
  declarations: [PathwayListComponent]
})
export class PathwayModule { }
