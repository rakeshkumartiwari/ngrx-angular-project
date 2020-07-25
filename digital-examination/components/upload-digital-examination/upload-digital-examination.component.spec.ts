import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDigitalExaminationComponent } from './upload-digital-examination.component';

describe('UploadDigitalExaminationComponent', () => {
  let component: UploadDigitalExaminationComponent;
  let fixture: ComponentFixture<UploadDigitalExaminationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDigitalExaminationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDigitalExaminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
