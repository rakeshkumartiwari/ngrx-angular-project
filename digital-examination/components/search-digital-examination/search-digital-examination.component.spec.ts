import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SearchDigitalExaminationComponent } from './search-digital-examination.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { IboSharedLibModule } from '@ibo/ibo-shared-lib';
import { DocumentsAvailability } from '../../models/digital-examination.model';


const data = [
  {
    "apComponenetAssocId": 1,
    "courseId": 1,
    "languageId": 1,
    "subjectName": "English",
    "levelName": "Beginner",
    "optionName": "OptionA",
    "componentName": "TestComponent",
    "languageName": "English",
    "versionNumber": "1.0",
    "courseDetails": "English 1.0 Beginner TestComponent English",
    "isDownloadAllowed": true,
    "isUploadAllowed": false,
    "isEditAllowed": true,
    "isViewPasswordAllowed": false,
    "examStartDate": "2020-10-12T00:00:00+00:00",
    "session": "AM",
    "files": [
      {
        "fileId": 2,
        "displayName": "EnglishPaperB.mp3",
        "fileLink": "Test",
        "isMusicPackage": true,
        "osVersion": "MAC",
        "fileSize": 500
      },
      {
        "fileId": 10,
        "displayName": "EnglishPaperA.mp3",
        "fileLink": "Test",
        "isMusicPackage": true,
        "osVersion": "Windows",
        "fileSize": 500
      }
    ]
  },
  {
    "apComponenetAssocId": 1,
    "courseId": 2,
    "languageId": 2,
    "subjectName": "Korean LAL",
    "levelName": "MY",
    "optionName": "Korean Lang and Literature",
    "componentName": "Onscreen Examination",
    "languageName": "Korean",
    "versionNumber": "1.0",
    "courseDetails": "Korean LAL 1.0 MY Onscreen Examination Korean",
    "isDownloadAllowed": true,
    "isUploadAllowed": false,
    "isEditAllowed": true,
    "isViewPasswordAllowed": true,
    "examStartDate": "2020-10-12T00:00:00+00:00",
    "session": "AM",
    "files": [
      {
        "fileId": 3,
        "displayName": "KoreanLanguagePaper.pdf",
        "fileLink": "Test",
        "isMusicPackage": false,
        "osVersion": "Windows",
        "fileSize": 500
      }
    ]
  },
  {
    "apComponenetAssocId": 1,
    "courseId": 3,
    "languageId": 3,
    "subjectName": "German LAL",
    "levelName": "MY",
    "optionName": "German Lang and Literature",
    "componentName": "Onscreen Examination",
    "languageName": "German",
    "versionNumber": "1.0",
    "courseDetails": "German LAL 1.0 MY Onscreen Examination German",
    "isDownloadAllowed": true,
    "isUploadAllowed": false,
    "isEditAllowed": true,
    "isViewPasswordAllowed": true,
    "examStartDate": "2020-10-12T00:00:00+00:00",
    "session": "AM",
    "files": [
      {
        "fileId": 4,
        "displayName": "GermanLanguagePaperA.pdf",
        "fileLink": "Test",
        "isMusicPackage": false,
        "osVersion": "Windows",
        "fileSize": 500
      }
    ]
  },
  {
    "apComponenetAssocId": 1,
    "courseId": 3,
    "languageId": 3,
    "subjectName": "German LAL",
    "levelName": "MY",
    "optionName": "German Lang and Literature",
    "componentName": "Onscreen Examination",
    "languageName": "German",
    "versionNumber": "1.0",
    "courseDetails": "German LAL 1.0 MY Onscreen Examination German",
    "isDownloadAllowed": false,
    "isUploadAllowed": true,
    "isEditAllowed": false,
    "isViewPasswordAllowed": false,
    "examStartDate": "2020-10-12T00:00:00+00:00",
    "session": "AM",
    "files": []
  }
];

describe('SearchDigitalExaminationComponent', () => {
  let component: SearchDigitalExaminationComponent;
  let fixture: ComponentFixture<SearchDigitalExaminationComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchDigitalExaminationComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, IboSharedLibModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDigitalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnChanges', () => {
    component.ngOnChanges();
    component.compDigitalExaminationGridData = data;
    component.griDataCount = component.compDigitalExaminationGridData.length;
    expect(component.compDigitalExaminationGridData.length).toEqual(component.griDataCount);
  });

  it('should call ngOnInit', () => {
    component.digitalExaminationForm.controls.documentsAvailability.setValue('all');
    spyOn(component.DocumentsAvailabilityStatus, 'emit');
    component.clearForm();
    expect(component.DocumentsAvailabilityStatus.emit).toHaveBeenCalled()
    expect(component.digitalExaminationForm.controls['documentsAvailability'].value).toBe('all');
    expect(component.digitalExaminationForm).toBeTruthy();
  });

  it('should call clearForm', () => {
    component.clearForm();
    component.digitalExaminationForm.reset();
    component.digitalExaminationForm.markAsPristine();
    component.digitalExaminationForm.controls['documentsAvailability'].setValue('all');
    expect(component.digitalExaminationForm.controls['documentsAvailability'].value).toBe('all');
  });
  it('should onSearch', () => {
    component.digitalExaminationForm.controls.documentsAvailability.setValue('available');
    let payload = {
      groupList: [1, 2, 3],
      subgroupList: [1, 2, 3],
      subjectList: [1, 2, 3],
      levelList: [1, 2, 3],
      optionList: [1, 2, 3],
      componentList: [1, 2, 3],
      languageList: [1, 2, 3]
    };
    component.onSearch();
    if (component.digitalExaminationForm.value.documentsAvailability === DocumentsAvailability.AVAILABEL) {
      payload['documentsAvailability'] = true;
    }
    if (component.digitalExaminationForm.value.documentsAvailability === DocumentsAvailability.NOT_AVAILABLE) {
      payload['documentsAvailability'] = false;
    }
    expect(payload['documentsAvailability']).toBeTruthy();
  });

  it('should call disableSaveButton', () => {
    let result = component.disableSaveButton();
    expect(result).toBe('searchCourseBtn disabled ');
  });

  it('should call onGroupSelect', () => {
    spyOn(component.groupItemsIds, 'emit');
    let event = [1, 2, 3]
    component.groupData = [1, 2, 3, 4, 5]
    component.onGroupSelect(event);
    expect(component.groupItemsIds.emit).toHaveBeenCalled()
  });

  it('should call onSubgroupSelect', () => {
    spyOn(component.subgroupItemsIds, 'emit');
    let event = [1, 2, 3]
    component.subgroupData = [1, 2, 3, 4, 5]
    component.onSubgroupSelect(event);
    expect(component.subgroupItemsIds.emit).toHaveBeenCalled()
  });

  it('should call onSubjectSelect', () => {
    spyOn(component.subjectIds, 'emit');
    let event = [1, 2, 3]
    component.subjectData = [1, 2, 3, 4, 5]
    component.onSubjectSelect(event);
    expect(component.subjectIds.emit).toHaveBeenCalled()
  });

  it('should call onLevelSelect', () => {
    spyOn(component.levelIds, 'emit');
    let event = [1, 2, 3]
    component.levelData = [1, 2, 3, 4, 5]
    component.onLevelSelect(event);
    expect(component.levelIds.emit).toHaveBeenCalled()
  });

  it('should call onOptionSelect', () => {
    spyOn(component.optionIds, 'emit');
    let event = [1, 2, 3]
    component.optionData = [1, 2, 3, 4, 5]
    component.onOptionSelect(event);
    expect(component.optionIds.emit).toHaveBeenCalled()
  });

  it('should call onComponentSelect', () => {
    spyOn(component.componentIds, 'emit');
    let event = [1, 2, 3]
    component.componentData = [1, 2, 3, 4, 5]
    component.onComponentSelect(event);
    expect(component.componentIds.emit).toHaveBeenCalled()
  });

  it('should call onDropDwnClear', () => {
    component.onDropDwnClear('group');
    component.digitalExaminationForm.get('subgroup').reset();
    component.digitalExaminationForm.get('subject').reset();
    component.digitalExaminationForm.get('level').reset();
    component.digitalExaminationForm.get('option').reset();
    component.digitalExaminationForm.get('component').reset();
    component.digitalExaminationForm.get('language').reset();
  });

  it('should call onRadioButtonChange', () => {
    component.digitalExaminationForm.controls.documentsAvailability.setValue('all');
    spyOn(component.DocumentsAvailabilityStatus, 'emit');
    component.onRadioButtonChange();
    expect(component.DocumentsAvailabilityStatus.emit).toHaveBeenCalled()
    expect(component.digitalExaminationForm.controls['documentsAvailability'].value).toBe('all');
  });


});
