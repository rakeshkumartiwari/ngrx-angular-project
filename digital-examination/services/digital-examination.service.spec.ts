import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { DigitalExaminationService } from './digital-examination.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DigitalExaminationService', () => {
  let service: DigitalExaminationService;
  let httpMock = HttpTestingController;
  let http = HttpClient;

  beforeEach(
    () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
        providers: [DigitalExaminationService]
      });
      service = TestBed.get(DigitalExaminationService);
      httpMock = TestBed.get(HttpTestingController);
      http = TestBed.get(HttpClient);

    });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
});
