import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IboSharedLibModule } from '@ibo/ibo-shared-lib';
import { FileUploadModule } from 'ng2-file-upload';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DigitalExaminationRoutingModule } from './digital-examination-routing.module';
import { SearchDigitalExaminationComponent } from './components/search-digital-examination/search-digital-examination.component';
import { DigitalExaminationGridComponent } from './components/digital-examination-grid/digital-examination-grid.component';
import { UploadDigitalExaminationComponent } from './components/upload-digital-examination/upload-digital-examination.component';
import { ViewDigitalExaminationComponent } from './components/view-digital-examination/view-digital-examination.component';
import { ShellSearchGridDigitalExamComponent } from './containers/shell-search-grid-digital-exam/shell-search-grid-digital-exam.component';
import { ShellUploadDigitalExamComponent } from './containers/shell-upload-digital-exam/shell-upload-digital-exam.component';
import { ShellViewDigitalExamComponent } from './containers/shell-view-digital-exam/shell-view-digital-exam.component';
import { DigitalExamMaterialEffects } from './state/effects/digital-examination-effects';
import * as DigitalExamReducer from './state/reducer/digital-examination-reducer';


@NgModule({
  declarations: [
    SearchDigitalExaminationComponent,
    DigitalExaminationGridComponent,
    UploadDigitalExaminationComponent,
    ViewDigitalExaminationComponent,
    ShellSearchGridDigitalExamComponent,
    ShellUploadDigitalExamComponent,
    ShellViewDigitalExamComponent],
  imports: [
    CommonModule,
    DigitalExaminationRoutingModule,
    IboSharedLibModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    EffectsModule.forFeature([DigitalExamMaterialEffects]),
    StoreModule.forFeature(
      DigitalExamReducer.DIGITAL_EXAM_FEATURE_KEY,
      DigitalExamReducer.reducer
    ),
  ]
})
export class DigitalExaminationModule { }
