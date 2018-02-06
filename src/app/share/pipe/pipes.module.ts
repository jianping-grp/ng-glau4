import {NgModule} from '@angular/core';
import {MoleculeCountPipe} from './molecule-count.pipe';
import {StringTrimPipe} from './string-trim.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MoleculeCountPipe,
    StringTrimPipe,
  ],
  exports: [
    MoleculeCountPipe,
    StringTrimPipe,
  ]
})

export class PipesModule { }
