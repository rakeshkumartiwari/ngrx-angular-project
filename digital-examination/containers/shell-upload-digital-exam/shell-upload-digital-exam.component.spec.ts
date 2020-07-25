import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellUploadDigitalExamComponent } from './shell-upload-digital-exam.component';

describe('ShellUploadDigitalExamComponent', () => {
  let component: ShellUploadDigitalExamComponent;
  let fixture: ComponentFixture<ShellUploadDigitalExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShellUploadDigitalExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellUploadDigitalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
