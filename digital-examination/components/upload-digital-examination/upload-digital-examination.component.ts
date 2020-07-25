import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { fileUploadConfigNonMusic, fileUploadConfigMusicMac, fileUploadConfigMusicWindows, maxUploadFileSize, fileScanStatus, uploadJson, commonConfig } from '../../utils/upload-digital-exam.utils';
import { PackageType } from '../../models/digital-examination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-digital-examination',
  templateUrl: './upload-digital-examination.component.html',
  styleUrls: ['./upload-digital-examination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadDigitalExaminationComponent implements OnInit, OnChanges {

  @Output() fileDownload = new EventEmitter<any>();
  @Output() submitUploadData = new EventEmitter<any>();
  @Input() uploadGridData: any;

  assignButtonStyle: string = 'searchCourseBtn searchBtn disabled assignStyle';

  uploadForm: FormGroup;
  public attachments = [];
  // fileUploadInputs = {};
  maxUploadFileSize;
  // uploadFile: any;
  uploadJson: any;
  commonConfig: any;
  fileScanStatus: any;
  fileUploadProgress = 0;
  translatedPageContent: any;

  fileUploadInputsNonMusic = {
    maxSize: 0,
    singleMaxFileSize: 0,
    limit: 0,
    allowedFileType: [],
    allowedMimeType: []
  };

  fileUploadInputsMusicMac = {
    maxSize: 0,
    singleMaxFileSize: 0,
    limit: 0,
    allowedFileType: [],
    allowedMimeType: []
  };

  fileUploadInputsMusicWindows = {
    maxSize: 0,
    singleMaxFileSize: 0,
    limit: 0,
    allowedFileType: [],
    allowedMimeType: []
  };

  packageType: typeof PackageType = PackageType;

  constructor(private formbuilder: FormBuilder, private router: Router) { 
    
  }

  ngOnInit() {
    this.initFileInputs();
    this.createForm();
    const fileStatusCodes = {};
    commonConfig.fileStatusCodesIDs.forEach(element => {
      const ob = (uploadJson && uploadJson[element] &&
        uploadJson[element].MessageUniqueId === element) ? uploadJson[element] : {};
      fileStatusCodes[element] = ob ? ob : '';
    });
    this.translatedPageContent = { translateData: uploadJson, fileStatusCodes };
  }

  ngOnChanges(changes?: SimpleChanges) {
    // if (changes && changes.compDropdown) {
    //   this.formConfig = getFormAtrribute({ addRegulatorForm: this.addRegulatorForm, addAttributeForm: this.addAttributeForm }
    //     , this.compDropdown);
    // }
    // if (this.isEdit && changes && changes.compEditRowData && this.addRegulatorForm && this.addAttributeForm) {
    //   this.initailizeFormContent();
    //   this.editAttachments = this.addAttributeForm.get('QualAttachment') ? this.addAttributeForm.get('QualAttachment').value : [];
    //   this.editAttachments.map(element => {
    //     const codeFirstIndex = element.DocumentLink.toString().lastIndexOf(' _');
    //     const codeLastIndex = element.DocumentLink.toString().lastIndexOf('.');
    //     const name = element.DocumentLink.substring(0, codeFirstIndex).concat(element.DocumentLink.substring(codeLastIndex, element.DocumentLink.length));
    //     const FileId = element.Id;
    //     this.attachments.push({ doucumentId: FileId, FileId, uploadStatus: 'completed', progress: 0, FileName: name, name, size: element.FileSize, ScanStatusId: 10, DocumentID: '' });
    //     return element;
    //   });
    //   this.completeEdit = true;
    // } else {
    //   this.completeEdit = false;
    // }
    // const fileStatusCodes = {};
    // commonConfig.fileStatusCodesIDs.forEach(element => {
    //   const ob = (uploadJson && uploadJson[element] &&
    //     uploadJson[element].MessageUniqueId === element) ? uploadJson[element] : {};
    //   fileStatusCodes[element] = ob ? ob : '';
    // });
    // this.translatedPageContent = { translateData: uploadJson, fileStatusCodes };

  }

  initFileInputs() {
    this.fileUploadInputsNonMusic = fileUploadConfigNonMusic;
    this.fileUploadInputsMusicMac = fileUploadConfigMusicMac;
    this.fileUploadInputsMusicWindows = fileUploadConfigMusicWindows;
    this.maxUploadFileSize = maxUploadFileSize;
    this.fileScanStatus = fileScanStatus;
  }

  createForm() {
    this.uploadForm = this.formbuilder.group({
      viewBy: new FormControl('No'),
      NonMusicAttachment: new FormControl([])
    });
  }

  handleChange(event) {
   
  }

  onFileAdded(file) {
    const allfilesadded = file.files;
    allfilesadded.forEach(fileData => {
      const name = fileData.name;
      const newFile: File = new File([fileData], name, { type: fileData.type });
      const FileId = Math.random().toString(36).substr(2, 9);
      this.attachments.push(
        {
          FileId, uploadStatus: 'completed', progress: 0, name, size: newFile.size, ScanStatusId: 10,
          DocumentID: '',
          newFile
        });
      if (this.uploadForm && this.uploadForm.get('NonMusicAttachment')) {
      this.assignButtonStyle = "searchCourseBtn searchBtn"
        const attechments = this.uploadForm.get('NonMusicAttachment').value;
        attechments.push({ newFile, DocumentId: FileId });
        this.uploadForm.controls.NonMusicAttachment.setValue(attechments);
        this.uploadForm.controls.NonMusicAttachment.markAsDirty();
      }
    });
  }

  onFileDownload(file) {
    if (!file.newFile) {
      this.fileDownload.emit(file);
    }
  }

  removeFromAttachments(item) {
    const fileIndex = this.attachments.findIndex(element => element.FileId === item.files.FileId);
    if (fileIndex !== -1) {
      this.attachments.splice(fileIndex, 1);
    }
  }
  cancelUpload(item) {
    this.removeFromAttachments(item);
  }

   onUploadedFileRemoved(fileData) {
    const attechments = this.uploadForm.get('NonMusicAttachment').value;
    const index = this.attachments.findIndex(element => (
      element.FileId === fileData.files.FileId));
    if (index !== -1) {
      attechments.splice(index, 1);
      this.attachments.splice(index, 1);
    }
    this.uploadForm.controls.NonMusicAttachment.setValue(attechments);
    this.uploadForm.controls.NonMusicAttachment.markAsDirty();

  }

  onCancel() {
    this.router.navigate(['PD/digital-examination']);
  }

  onSubmit() {
    if(this.uploadForm.valid && this.uploadForm.get('NonMusicAttachment').value.length) {
      const payload = {
        'IsMusicPackage': this.uploadForm.controls.viewBy.value === 'No' ? false : true,
        'CourseComponentId': this.uploadGridData.apComponenetAssocId,
        'IbLanguageId': this.uploadGridData.languageId
      };
      this.submitUploadData.emit({ data: payload, fileArray: this.uploadForm.getRawValue().NonMusicAttachment});
    }
    
  }

}
