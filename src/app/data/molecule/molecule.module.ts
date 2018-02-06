import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../share/shared.module';
import {CardModule} from '../../share/card/card.module';
import {ContainerModule} from '../container/container.module';
import {MoleculeRoutingModule} from './molecule.routing.module';
import {MoleculeListComponent} from './molecule-list/molecule-list.component';
import {MoleculeDrugComponent} from './molecule-drug/molecule-drug.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CardModule,
    ContainerModule,
    MoleculeRoutingModule
  ],
  declarations: [
    MoleculeListComponent,
    MoleculeDrugComponent
  ]
})
export class MoleculeModule { }
