import { Component, OnInit, Input } from '@angular/core';
import { fileScanStatus, commonConfig } from '../../utils/upload-digital-exam.utils';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { OsVersion } from '../../models/digital-examination.model';

@Component({
  selector: 'app-view-digital-examination',
  templateUrl: './view-digital-examination.component.html',
  styleUrls: ['./view-digital-examination.component.scss']
})
export class ViewDigitalExaminationComponent implements OnInit {
  @Input() gridData;
  courseDetail: Observable<any>;
  macAttachments = [];
  windowsAttachments = [];
  isMacVersion = false;
  isWindowsVersion = false;
  fileScanStatus;
  fileUploadInputs;
  translatedPageContent;
  fileUploadProgress = 0;
  maxUploadFileSize = 0;
  uploadJson;
  rowDataReceived;
  kbValue = 1024;

  constructor(private readonly router: Router) {
    this.fileUploadInputs = {
      maxSize: 0,
      singleMaxFileSize: 0,
      limit: 0,
      allowedFileType: [],
      allowedMimeType: []
    };
    this.uploadJson = {
      infNoOfFileUp: {
        TranslationStatusId: '111',
        ControlTypeId: '122',
        Content: 'file uploaded'
      },
      infMB: {
        TranslationStatusId: '111',
        ControlTypeId: '122',
        Content: 'MB'
      }
    };
  }

  ngOnInit() {
    this.fileScanStatus = fileScanStatus;
    const fileStatusCodes = {};
    commonConfig.fileStatusCodesIDs.forEach(element => {
      const ob = (this.uploadJson && this.uploadJson[element] &&
        this.uploadJson[element].MessageUniqueId === element) ? this.uploadJson[element] : {};
      fileStatusCodes[element] = ob ? ob : '';
    });
    this.translatedPageContent = { translateData: this.uploadJson, fileStatusCodes };

    if (this.gridData) {
      this.courseDetail = this.gridData['course'];
      (this.gridData['uploadedFiles']).forEach(element => {
        if (element.osVersion.toLowerCase() === OsVersion.MAC) {
          this.isMacVersion = true;
          const FileId = Math.random().toString(36).substr(2, 9);
          const name = element.displayName;
          const fileSize = (element.fileSize) * this.kbValue;
          this.macAttachments.push({
            FileId, uploadStatus: 'completed',
            progress: 0, FileName: name, name, size: fileSize, ScanStatusId: 10, DocumentID: ''
          });
        } else {
          this.isWindowsVersion = true;
          const FileId = Math.random().toString(36).substr(2, 9);
          const name = element.displayName;
          const fileSize = (element.fileSize) * this.kbValue;
          this.windowsAttachments.push({
            FileId, uploadStatus: 'completed',
            progress: 0, FileName: name, name, size: fileSize, ScanStatusId: 10, DocumentID: ''
          });
        }
      });
    }
  }
  goBack() {
    this.router.navigate(['PD/digital-examination']);
  }
}
