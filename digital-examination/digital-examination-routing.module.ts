import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellSearchGridDigitalExamComponent } from './containers/shell-search-grid-digital-exam/shell-search-grid-digital-exam.component';
import { ShellViewDigitalExamComponent } from './containers/shell-view-digital-exam/shell-view-digital-exam.component';
import { ShellUploadDigitalExamComponent } from './containers/shell-upload-digital-exam/shell-upload-digital-exam.component';


const routes: Routes = [
  {
    path: '',
    component: ShellSearchGridDigitalExamComponent,
    data: { showNavi: true }
  },
  {
    path: 'manage-digital-exam',
    component: ShellSearchGridDigitalExamComponent,
    data: { showNavi: true }
  },
  {
    path: 'upload-digital-exam',
    component: ShellUploadDigitalExamComponent,
    data: { showNavi: true }
  },
  {
    path: 'view-digital-exam',
    component: ShellViewDigitalExamComponent,
    data: { showNavi: true }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigitalExaminationRoutingModule { }
