import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDigitalExaminationComponent } from './view-digital-examination.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IboSharedLibModule } from '@ibo/ibo-shared-lib';

describe('ViewDigitalExaminationComponent', () => {
  let component: ViewDigitalExaminationComponent;
  let fixture: ComponentFixture<ViewDigitalExaminationComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDigitalExaminationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        IboSharedLibModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDigitalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit', () => {
    const rowMockData = {
      course: 'English 1.0 Beginner TestComponent English',
      uploadedFiles: [{
        displayName: 'EnglishPaperB.mp3',
        fileId: 2,
        fileLink: 'Test',
        fileSize: 500,
        isMusicPackage: true,
        osVersion: 'MAC',
      },
      {
        displayName: 'EnglishPaperA.mp3',
        fileId: 10,
        fileLink: 'Test',
        fileSize: 500,
        isMusicPackage: true,
        osVersion: 'Windows'
      }]
    };
    component.uploadJson = {
      'infNoOfFileUp': {
        'TranslationStatusId': '111',
        'ControlTypeId': '122',
        'Content': 'file uploaded'
      },
      'infMB': {
        'TranslationStatusId': '111',
        'ControlTypeId': '122',
        'Content': 'MB'
      },
      '2000011293': {
        MessageUniqueId: '2000011293'
      }
    };
    component.gridData = rowMockData;
    component.ngOnInit();
    expect(component.isWindowsVersion).toEqual(true);
  });
  it('should call goBack()', () => {
    component.goBack();
    expect(component.isMacVersion).toEqual(false);
  });
});
