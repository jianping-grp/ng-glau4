import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocCardComponent} from './doc-card/doc-card.component';
import {MoleculePropertiesCardComponent} from './molecule-properties-card/molecule-properties-card.component';
import {SharedModule} from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [DocCardComponent, MoleculePropertiesCardComponent],
  exports: [DocCardComponent, MoleculePropertiesCardComponent],
  entryComponents: [DocCardComponent, MoleculePropertiesCardComponent]
})

export class CardModule { }
