import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError } from "rxjs/operators";

import { DigitalExaminationService } from '../../services/digital-examination.service';
import * as digitalExamActions from '../actions/digital-examination-action';
import { Observable, throwError } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class DigitalExamMaterialEffects {
  constructor(
    private digitalExamActions$: Actions,
    private digitalExamService: DigitalExaminationService
  ) { }


  // Create Effects from here:
  getInitialDigitalExamMaterialGridData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.InitialGridDataLoad),
      switchMap(({ pageDetails, userRoleId }) => this.digitalExamService.getInitialDigitalExamMaterialGridData(pageDetails, userRoleId)
        .pipe(
          map((value: any) => {
            return digitalExamActions.InitialGridDataSuccess({ value });
          })
        ))
    ));

  getDigitalExamMaterialGridDataBySearchParams = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.GridDataBySerachLoad),
      switchMap(({ pageDetails, searchParams, userRoleId }) => this.digitalExamService.getGridDataBySearchParams(pageDetails, searchParams, userRoleId)
        .pipe(
          map((value: any) => {
            return digitalExamActions.GridDataBySerachSuccess({ value });
          })
        ))
    ));

  getGroupData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.GroupDataLoad),
      switchMap(({ id }) => this.digitalExamService.getGroupData(id)
        .pipe(
          map((value: any) => {
            return digitalExamActions.GroupDataSuccess({ value });
          })
        ))
    ));

  getSubgroupData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.subgroupDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getSubgroupData(ids)
        .pipe(
          map((value: any) => {
            return digitalExamActions.subgroupDataSuccess({ value });
          })
        ))
    ));

  getSubjectData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.subjectDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getSubjectData(ids)
        .pipe(
          map((value: any) => {
            return digitalExamActions.subjectDataSuccess({ value });
          })
        ))
    ));

  getSubjectsByGroup = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.subjectByGroupDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getSubjectsByGroup(ids)
        .pipe(
          map((value: any) => {

            return digitalExamActions.subjectByGroupDataSuccess({ value });
          })
        ))
    ));


  getLevelData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.levelDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getLevelData(ids)
        .pipe(
          map((value: any) => {
            return digitalExamActions.levelDataSuccess({ value });
          })
        ))
    ));

  getOptionData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.optionDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getOptionData(ids)
        .pipe(
          map((value: any) => {
            return digitalExamActions.optionSuccess({ value });
          })
        ))
    ));

  getComponentData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.componentDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getComponentData(ids)
        .pipe(
          map((value: any) => {
            return digitalExamActions.componentSuccess({ value });
          })
        ))
    ));

  getLanguageData = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.languageDataLoad),
      switchMap(({ ids }) => this.digitalExamService.getLanguageData(ids)
        .pipe(
          map((value: any) => {
            return digitalExamActions.languageSuccess({ value });
          })
        ))
    ));

  getPasswordToView = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.viewPasswordNonMusicLoad),
      switchMap(({ fieldId }) => this.digitalExamService.getPasswordDataToView(fieldId)
        .pipe(
          map((passwordValue) => {
            return digitalExamActions.viewPasswordNonMusicSuccess({ passwordValue });
          })
        ))
    ));

    getUploadData: Observable<Action> = createEffect(() =>
    this.digitalExamActions$.pipe(
        ofType(digitalExamActions.uploadDigitalData),
        switchMap((data) => this.digitalExamService.uploadDigitalExam(data.data, data.fileArray)
            .pipe(
                map((data) => {
                    return digitalExamActions.uploadDigitalDataSuccess({ data });
                }),
            ))
    )
);
  getDownloadResponse = createEffect(() =>
    this.digitalExamActions$.pipe(
      ofType(digitalExamActions.documentsDownloadsLoad),
      switchMap(({ files }) => this.digitalExamService.downloadDocuments(files)
        .pipe(
          map((response) => {
            return digitalExamActions.documentsDownloadsSuccess({ response });
          })
        )),
      catchError(this.handleError)
    ));

  private handleError(error: Response) {
    return throwError(error);
  }
}
