import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JsmeModule} from '../jsme/jsme.module';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule, MatSelectModule, MatSidenavModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule, MatTooltipModule,    MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSortModule,
} from '@angular/material';
import {PipesModule} from './pipe/pipes.module';
import {FileUploadModule} from "ng2-file-upload";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    JsmeModule,
    PipesModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    JsmeModule,
    PipesModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTabsModule,
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
  ]
})

export class SharedModule { }
