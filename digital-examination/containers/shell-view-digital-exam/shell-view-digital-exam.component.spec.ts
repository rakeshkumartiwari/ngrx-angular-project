import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellViewDigitalExamComponent } from './shell-view-digital-exam.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IboSharedLibModule } from '@ibo/ibo-shared-lib';
import * as reducer from '../../state/reducer/digital-examination-reducer';
import { EffectsModule } from '@ngrx/effects';
import { MockStore } from '@ngrx/store/testing';

describe('ShellViewDigitalExamComponent', () => {
  let component: ShellViewDigitalExamComponent;
  let fixture: ComponentFixture<ShellViewDigitalExamComponent>;
  let store: MockStore<any>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShellViewDigitalExamComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        IboSharedLibModule,
        StoreModule.forRoot({}, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
        StoreModule.forFeature('digitalExamMaterial', reducer.reducer),
        EffectsModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellViewDigitalExamComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
