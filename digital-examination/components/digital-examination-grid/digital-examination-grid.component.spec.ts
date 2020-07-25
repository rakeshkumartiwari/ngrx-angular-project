import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalExaminationGridComponent } from './digital-examination-grid.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToolTipDirective, IboSharedButtonDirective } from '@ibo/ibo-shared-lib';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import * as subscribe from '../../state/selectors/digital-examination-selector'


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

const tableConfig = {
  columns: this.columns,
  loading: 'Loading...',
  noResultFound: 'No result found',
  showSearch: false,
  showLoading: true,
  showNoResultFound: false,
  isNotification: false,
  // subTitle: {
  //   name: 'Search result',
  // },
  notification: {
    show: false,
    name: ''
  },

};

const singleData = {
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
}

describe('DigitalExaminationGridComponent', () => {
  let component: DigitalExaminationGridComponent;
  let fixture: ComponentFixture<DigitalExaminationGridComponent>;
  const datePipe: DatePipe = new DatePipe('en-US');
  let store: MockStore<{ viewScheduledActivityData: any }>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalExaminationGridComponent, ToolTipDirective, IboSharedButtonDirective],
      providers: [
        { provide: DatePipe, useValue: datePipe },
        provideMockStore({
          selectors: [
            { selector: subscribe.getPasswordDataToView, value: {} },
            ]
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule,  RouterTestingModule.withRoutes([]),]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalExaminationGridComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setCurrentPage', () => {
    jest.spyOn(component.pageNumber, 'emit');
    component.setCurrentPage({ skip: 0, top: 10, currentPage: 1 });
    expect(component.pageNumber.emit).toHaveBeenCalled();
  });

  it('should call ngOnChanges', () => {
    component.compDigitalExaminationGridData = data;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.compDigitalExaminationGridData.length).toBe(4);
  });

  it('should call showTableByDocumentsAvailability', () => {
    component.documentStatus = 'all';
    component.compDigitalExaminationGridData = data;
    component.showTableByDocumentsAvailability(component.documentStatus);
    fixture.detectChanges();
    expect(component.documentStatus).toBe('all');
    expect(component.compDigitalExaminationGridData.length).toBe(4);
  });


  it('should call toggleFilterMenu', () => {
    component.digitalExaminationGridData = data;
    component.backupData = data;
    component.toggleFilterMenu({ dir: 'asc', id: 1, sortBy: 'courseDetails', name: '', title: 'Course details' });
    expect(component.showIcon).toEqual('asc');
  })


  it('should call filterByColumn', () => {
    component.backupData = data;
    component.compDigitalExaminationGridData = data;
    component.tableConfig = tableConfig;
    const event = {
      "event": { "target": { "courseDetails": "Course details", "value": "A" } }, "dataName": "Course details", "childName": "", "courseId": 2
    }
    component.filterByColumn(event);
    expect(component.digitalExaminationGridData).toEqual(component.filteredDigitalExamData);
  });
  it('should call filterFromPop ', () => {
    component.pageDetail = {
      currentPage: 1,
      top: 10,
      skip: 10
    };
    const testConfig = {
      "sortBy": "courseDetails",
      "position": "asc",
      "title": "Course details",
      "colObj": {
        "title": "Course details",
        "data": "courseDetails",
        "dataName": "courseDetails",
        "filter": true,
        "class": "",
        "input": "",
        "sortByCol": true,
        "placeholder": "Search",
        "width": 20
      },
      "index": null,
      "selectedData": [
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
        },
      ],
      "objPosition": {},
      "selectedName": ["Course details"]
    }
    component.filterFromPop(testConfig);
    expect(component.filteredDigitalExamData).toEqual(component.digitalExaminationGridData);
  });

  it('should call navigateToAction', () => {
    const data = {
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
    };
    jest.spyOn(component.snapShotData, 'emit');
    component.navigateToAction({ data, viewType: 'view' });
    expect(component.snapShotData.emit).toHaveBeenCalled();
  });

  it('should call DateForDisplay', () => {
    let formatedDate = component.DateForDisplay('2020-10-12T00:00:00+00:00');
    expect(formatedDate).toEqual('12-Oct-2020');
  });

  it('should call openModal', () => {
    component.isWindows = false;
    component.isMac = false;
    component.openModal(singleData);
    fixture.detectChanges();
    expect(component.isWindows).toBeTruthy();
    expect(component.isMac).toBeTruthy();
    expect(component.showModal).toBeTruthy();
  });

  it('should call hideModal', () => {
    component.hideModal();
    fixture.detectChanges();
    expect(component.showModal).toBeFalsy();
  });

  it('should call onDownload', () => {
    spyOn(component.emitFiles, 'emit');
    component.files = [
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
    component.onDownload();
    expect(component.emitFiles.emit).toHaveBeenCalled()
  });

  it('should call disableDownloadButton', () => {
    component.isWindows = false;
    component.isMac = false;
    let disableStatus = component.disableDownloadButton()
    fixture.detectChanges();
    expect(disableStatus).toBe('searchCourseBtn disabled');
  });

  it('should call viewPassword', () => {
    const getFieldIdMock = {
      files: [
        {
          fileId: 4
        }
      ]
    };
    component.viewPassword(getFieldIdMock);
    expect(component.showViewPasswordModal).toEqual(true);
  });

  it('should call hideViewPasswordModal', () => {
    component.hideViewPasswordModal();
    expect(component.showViewPasswordModal).toEqual(false);
  });
});
