import {File } from '../../models/digital-examination.model';
import { createAction, props } from '@ngrx/store';

export const InitialGridDataLoad = createAction(
    '[digital-exam-material] GridDataLoad',
    props<{ pageDetails: any , userRoleId: number}>()
);

export const InitialGridDataSuccess = createAction(
    '[digital-exam-material] GridDataSuccess',
    props<{ value: any }>()
);

export const GridDataBySerachLoad = createAction(
    '[digital-exam-material] GridDataBySerachLoad',
    props<{ pageDetails: any , searchParams: any, userRoleId: number}>()
);

export const GridDataBySerachSuccess = createAction(
    '[digital-exam-material] GridDataBySerachSuccess',
    props<{ value: any }>()
);

export const GroupDataLoad = createAction(
    '[digital-exam-material] GroupDataLoad',
    props<{ id: any }>()
);

export const GroupDataSuccess = createAction(
    '[digital-exam-material] GroupDataSuccess',
    props<{ value: any }>()
);

export const subgroupDataLoad = createAction(
    '[digital-exam-material] subgroupDataLoad',
    props<{ ids: number[] }>()
);

export const subgroupDataSuccess = createAction(
    '[digital-exam-material] subgroupDataSuccess',
    props<{ value: any }>()
);

export const subjectDataLoad = createAction(
    '[digital-exam-material] subjectDataLoad',
    props<{ ids: number[] }>()
);

export const subjectDataSuccess = createAction(
    '[digital-exam-material] subjectDataSuccess',
    props<{ value: any }>()
);

export const subjectByGroupDataLoad = createAction(
    '[digital-exam-material] subjectByGroupDataLoad',
    props<{ ids: number[] }>()
);

export const subjectByGroupDataSuccess = createAction(
    '[digital-exam-material] subjectDataSuccess',
    props<{ value: any }>()
);

export const levelDataLoad = createAction(
    '[digital-exam-material] levelDataLoad',
    props<{ ids: number[] }>()
);

export const levelDataSuccess = createAction(
    '[digital-exam-material] levelDataSuccess',
    props<{ value: any }>()
);

export const optionDataLoad = createAction(
    '[digital-exam-material] optionDataLoad',
    props<{ ids: number[] }>()
);

export const optionSuccess = createAction(
    '[digital-exam-material] optionSuccess',
    props<{ value: any }>()
);

export const componentDataLoad = createAction(
    '[digital-exam-material] componentDataLoad',
    props<{ ids: number[] }>()
);

export const componentSuccess = createAction(
    '[digital-exam-material] componentSuccess',
    props<{ value: any }>()
);

export const languageDataLoad = createAction(
    '[digital-exam-material] languageDataLoad',
    props<{ ids: number[] }>()
);

export const languageSuccess = createAction(
    '[digital-exam-material] languageSuccess',
    props<{ value: any }>()
);

export const documentsDownloadsLoad = createAction(
    '[digital-exam-material] fileIdsLoad',
    props<{ files: File[] }>()
);

export const documentsDownloadsSuccess = createAction(
    '[digital-exam-material] fileIdsLoad',
    props<{ response: any }>()
);





export const groupClear = createAction(
    '[digital-exam-material] groupClear',
);

export const subgroupClear = createAction(
    '[digital-exam-material] subgroupClear',
);

export const subjectClear = createAction(
    '[digital-exam-material] subjectClear',
);

export const levelClear = createAction(
    '[digital-exam-material] levelClear',
);

export const optionClear = createAction(
    '[digital-exam-material] optionClear',
);

export const componentClear = createAction(
    '[digital-exam-material] componentClear',
);

export const languageClear = createAction(
    '[digital-exam-material] languageClear',
);
export const passViewDigitalUploadedData = createAction(
    '[digital-exam-material] View Uploaded Digital Exam Data', props<{ data: any }>());

export const viewPasswordNonMusicLoad = createAction(
    '[digital-exam-material] ViewPassword Data Load', props<{ fieldId: number }>());

export const viewPasswordNonMusicSuccess = createAction(
    '[digital-exam-material] ViewPassword Data Success', props<{ passwordValue: string }>());

export const passUploadGridData = createAction(
    '[digital-exam-material] passUploadGridData', props<{ data: any }>());

export const uploadDigitalData = createAction(
    '[digital-exam-material] uploadDigitalData',
    props<{ data: any, fileArray: any }>()
);

export const uploadDigitalDataSuccess = createAction(
    '[digital-exam-material] uploadDigitalDataSuccess',
    props<{ data: any }>()
);

export const refreshUploadResponseState = createAction(
    '[Both] Reset Upload digital data to initial state');
    