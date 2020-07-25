import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
//import { environment } from './../../../../environments/environment.insprint';
import { Observable, throwError, forkJoin, EMPTY } from 'rxjs';
import { File } from '../models/digital-examination.model';
@Injectable({
  providedIn: 'root'
})
export class DigitalExaminationService {

  headers: HttpHeaders;
  headers1: HttpHeaders;

  constructor(private http: HttpClient) {
    if (environment.isInsprint) {
      this.headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('SupportLanguageCode', '1')
        .set('InstitutionId', '1')
        .set('ProgrammeId', '10')
        .set('AssessmentPeriodId', '10');
    } else {
      this.headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('SupportLanguageCode', '1')
        .set('InstitutionId', '3')
        .set('ProgrammeId', '9')
        .set('AssessmentPeriodId', '1');
    }
  }

  getInitialDigitalExamMaterialGridData(pageDetails, userRoleId): Observable<any> {
    //userRoleId 1 for IBO user  if 2 Scchool ushool
    if (userRoleId == 1) {
      let url = `${environment.paperDistributionUrl}examinationmaterials/header?skip=${pageDetails.skip}&take=${pageDetails.top}&UserTypeId=${userRoleId}&orderBy=GroupNumber&orderBy=CoursDetail`;
      return this.http.get<any>(url, { headers: this.headers }).pipe(
        map((res) => res)
      );
    }

    if (userRoleId == 2) {
      let url = `${environment.paperDistributionUrl}examinationmaterials/header?skip=${pageDetails.skip}&take=${pageDetails.top}&UserTypeId=${userRoleId}&orderBy=GroupNumber&orderBy=Group&orderBy=Subject&orderBy=Components`;
      return this.http.get<any>(url, { headers: this.headers }).pipe(
        map((res) => res)
      );
    }
  }

  getGridDataBySearchParams(pageDetails, searchParams, userRoleId): Observable<any> {
    //userRoleId 1 for IBO user  if 2 Scchool ushool
    let url = '';
    if (userRoleId == 1) {
      url = `${environment.paperDistributionUrl}examinationmaterials/header?skip=${pageDetails.skip}&take=${pageDetails.top}&UserTypeId=${userRoleId}&orderBy=GroupNumber&orderBy=CoursDetail`
    }
    if (userRoleId == 2) {
      url = `${environment.paperDistributionUrl}examinationmaterials/header?skip=${pageDetails.skip}&take=${pageDetails.top}&UserTypeId=${userRoleId}&orderBy=GroupNumber&orderBy=Group&orderBy=Subject&orderBy=Components`;
    }

    if (searchParams.groupList.length) {
      url = `${url}&groupId=${searchParams.groupList.join('&groupId=')}`
    }
    if (searchParams.subgroupList.length) {
      url = `${url}&subjectId=${searchParams.subgroupList.join('&subjectId=')}`
    }
    if (searchParams.subjectList.length) {
      url = `${url}&subjectId=${searchParams.subjectList.join('&subjectId=')}`
    }
    if (searchParams.levelList.length) {
      url = `${url}&levelId=${searchParams.levelList.join('&levelId=')}`
    }
    if (searchParams.optionList.length) {
      url = `${url}&optionId=${searchParams.optionList.join('&optionId=')}`
    }
    if (searchParams.componentList.length) {
      url = `${url}&componentId=${searchParams.componentList.join('&componentId=')}`
    }
    if (searchParams.languageList.length) {
      url = `${url}&languageId=${searchParams.languageList.join('&languageId=')}`
    }
    if ((typeof searchParams.documentsAvailability !== 'undefined')) {
      url = `${url}&hasUploadedDocuments=${searchParams.documentsAvailability}`
    }

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map((res) => res)
    );

  }

  getGroupData(id: number): Observable<any> {
    return this.http.get<any>(`${environment.paperDistributionUrl}lookups/subjectgroup?programmeId=${id}`).pipe(
      map((res) => res['result'])
    );
  }
  getSubgroupData(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/subjectsubgroup?subjectgroupId=${ids.join('&subjectgroupId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getSubjectData(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/subject?subjectSubGroupId=${ids.join('&subjectSubGroupId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getSubjectsByGroup(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/subject?subjectGroupId=${ids.join('&subjectGroupId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getLevelData(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/subjectlevel?subjectId=${ids.join('&subjectId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getOptionData(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/subjectoption?subjectlevelId=${ids.join('&subjectlevelId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getComponentData(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/component?subjectoptionId=${ids.join('&subjectoptionId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getLanguageData(ids: number[]): Observable<any> {
    let url = `${environment.paperDistributionUrl}lookups/language?componentId=${ids.join('&componentId=')}`;
    return this.http.get<any>(url).pipe(
      map((res) => res['result'])
    );
  }

  getPasswordDataToView(fieldId: number): Observable<any> {
    let url = `${environment.paperDistributionUrl}examinationmaterials/${fieldId}/viewpassword`;
    return this.http.get(url).pipe(
      map((res) => res['result'])
    );
  }

  uploadDigitalExam(data: any, fileArray): Observable<any> {
    this.headers1 = new HttpHeaders() 
      .set('SupportLanguageCode', 'ENG')
      .set('InstitutionId', '1')
      .set('ProgrammeId', '10')
      .set('AssessmentPeriodId', '10');
    const formData = new FormData();
    fileArray.forEach(element => {
      formData.append('files', element.newFile);
    });
    for ( var key in data ) {
      formData.append(key, data[key]);
    }
    return this.http.post<any>(environment.paperDistributionUrl + `examinationmaterials`, formData,  { headers: this.headers1 })
      .pipe(
        map(response => this.getResponse(response)),
        catchError(this.handleError)
      );
  }

  getResponse(response): any {
    return {
      response
    };
  }
  /**
   * For Events CURD operation, we use generic error handler.
   * @param error, error response object
   */
  downloadDocuments(files: File[]): Observable<any> {
    const options = { responseType: 'blob' as 'json' };

    // if files is coming undefined
    if (!files || files.length == 0) {
      return EMPTY;
    }

    // by this it can download One file or documents.
    if (files && files.length == 1 && files[0].displayName) {
      let url1 = `${environment.paperDistributionUrl}examinationmaterials/${files[0].fileId}/download`;
      return this.http.get<any>(url1, options)
        .pipe(
          map(resp => {
            const downloadedFile = new Blob([resp], { type: 'application/octet-stream' });
            if (downloadedFile) {
              const element = document.createElement('a');
              element.href = URL.createObjectURL(downloadedFile);
              element.download = files[0].displayName;
              document.body.appendChild(element);
              element.click();
            }
          }),
          catchError(this.handleError)
        );
    }


    // by this it can download Two file or documents.
    if (files && files.length == 2) {

      let firstUrl = this.http.get(`${environment.paperDistributionUrl}examinationmaterials/${files[0].fileId}/download`, options);
      let secondUrl = this.http.get(`${environment.paperDistributionUrl}examinationmaterials/${files[1].fileId}/download`, options);

      return forkJoin([firstUrl, secondUrl]).pipe
        (map((results: any) => {
          for (let i = 0; i < results.length; i++) {
            const downloadedFile = new Blob([results[i]], { type: 'application/octet-stream' });
            if (downloadedFile) {
              const element = document.createElement('a');
              element.href = URL.createObjectURL(downloadedFile);
              element.download = files[i].displayName;
              document.body.appendChild(element);
              element.click();
            }
          }
        }),
          catchError(this.handleError));
    }

  }
  private handleError(error: Response) {
    return throwError(error);
  }
}
