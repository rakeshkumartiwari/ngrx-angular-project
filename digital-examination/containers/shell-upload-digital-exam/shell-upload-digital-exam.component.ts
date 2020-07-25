import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InitialState } from '../../models/digital-examination.model';
import * as digiSelector from '../../state/selectors/digital-examination-selector';
import * as actions from '../../state/actions/digital-examination-action';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { pageHeading } from '../../../state/actions/paper-distribution.actions';

@Component({
  selector: 'app-shell-upload-digital-exam',
  templateUrl: './shell-upload-digital-exam.component.html'
})
export class ShellUploadDigitalExamComponent implements OnInit {

  uploadGridData$: Observable<any>;
  constructor(private store: Store<InitialState>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(pageHeading({value: 'Upload digital examination materials'}));
    this.uploadGridData$ = this.store.select(digiSelector.getUploadGridData);
  }


  /**
   * Calls download service
   * @param file fildata for download
   */
  shellFileDownload(file) {
    console.log('on Download Click', file)
    // this.store.dispatch(actions.getDownloadAttachedFileData({ data: file.FileId }));
  }

  submitUploadData(payload) {
    console.log(payload);
    this.store.dispatch(actions.uploadDigitalData({data: payload.data, fileArray: payload.fileArray }))

    this.router.navigate(['PD/digital-examination']);
  }

}
