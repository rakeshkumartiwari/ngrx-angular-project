import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ShellSearchGridDigitalExamComponent } from './shell-search-grid-digital-exam.component';
import * as subscribe from '../../state/selectors/digital-examination-selector'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

let shellDigitalExamGridData = [
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

let totalRecords = 4;

const pageDetail = {
  skip: 0,
  top: 1,
  currentPage: 1
}


describe('ShellSearchGridDigitalExamComponent', () => {
  let component: ShellSearchGridDigitalExamComponent;
  let fixture: ComponentFixture<ShellSearchGridDigitalExamComponent>;
  let store: MockStore<{ viewScheduledActivityData: any }>;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShellSearchGridDigitalExamComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: subscribe.getGridResult, value: {} },
            { selector: subscribe.getGroupData, value: [] },
            { selector: subscribe.getSubgroupData, value: [] },
            { selector: subscribe.getSubjectData, value: [] },
            { selector: subscribe.getLevelData, value: [] },
            { selector: subscribe.getOptionData, value: [] },
            { selector: subscribe.getComponentData, value: [] },
            { selector: subscribe.getLanguageData, value: [] }]
        }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [{ 'path': 'view-digital-exam' }] } }
        }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellSearchGridDigitalExamComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.shellDigitalExamGridData = shellDigitalExamGridData;
    component.totalRecords = totalRecords;
    fixture.detectChanges();
    component.ngOnInit();
    expect(component.shellDigitalExamGridData.length).toBe(4);
    expect(component.totalRecords).toBe(4);
  });

  it('should setPageNumber', () => {
    let spy = spyOn(store, 'dispatch');
    component.setPageNumber(pageDetail)
    component.pageDetail = pageDetail;
    fixture.detectChanges();
    expect(component.pageDetail).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should getDigitalExaminationForm', () => {
    let spy = spyOn(store, 'dispatch');
    let searchParams = {};
    component.getDigitalExaminationForm(searchParams)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should getGroupItemsIds', () => {
    let spy = spyOn(store, 'dispatch');
    let ids = [1, 2, 3];
    component.getGroupItemsIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);

    ids = [];
    component.getGroupItemsIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should getSubgroupItemsIds', () => {
    let spy = spyOn(store, 'dispatch');
    let ids = [1, 2, 3];
    component.getSubgroupItemsIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);

    ids = [];
    component.getSubgroupItemsIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should getSubjectIds', () => {
    let spy = spyOn(store, 'dispatch');
    let ids = [1, 2, 3];
    component.getSubjectIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);

    ids = [];
    component.getSubjectIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should getLevelIds', () => {
    let spy = spyOn(store, 'dispatch');
    let ids = [1, 2, 3];
    component.getLevelIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);

    ids = [];
    component.getLevelIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should getOptionIds', () => {
    let spy = spyOn(store, 'dispatch');
    let ids = [1, 2, 3];
    component.getOptionIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);

    ids = [];
    component.getOptionIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(4);

  });

  it('should getcomponentIds', () => {
    let spy = spyOn(store, 'dispatch');
    let ids = [1, 2, 3];
    component.getcomponentIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(3);

    ids = [];
    component.getcomponentIds(ids)
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should call navigateToViewPage', () => {
    let data = {};
    spyOn(router, 'navigate');
    let spy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.navigateToViewPage({ data });
    expect(store.dispatch).toBeCalled();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should call getDocumentsAvailabilityStatus', () => {
    let documentStatus = 'all';
    let spy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.getDocumentsAvailabilityStatus(documentStatus);
    expect(store.dispatch).toBeCalled();
    expect(spy).toHaveBeenCalledTimes(3);
    expect(component.documentStatus).toBe('all');
  });

  it('should call getFiles', () => {
    let files = [
      {
        fileId: 2,
        displayName: "EnglishPaperB.mp3",
        fileLink: "Test",
        isMusicPackage: true,
        osVersion: "MAC",
        fileSize: 500
      },
      {
        fileId: 10,
        displayName: "EnglishPaperA.mp3",
        fileLink: "Test",
        isMusicPackage: true,
        osVersion: "Windows",
        fileSize: 500
      }
    ]
    let spy = spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.getFiles(files);
    expect(store.dispatch).toBeCalled();
    expect(spy).toHaveBeenCalledTimes(3);
  });

});
