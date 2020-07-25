import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/digital-examination-action';
import { InitialState } from '../../models/digital-examination.model';


export const initialState: InitialState = {
  gridResult: {},
  groupData: [],
  subgroupData: [],
  subjectData: [],
  levelData: [],
  optionData: [],
  componentData: [],
  languageData: [],
  selectedDocumentRowData: {},
  passwordData: '',
  gridData: {},
  apiResponse: null
}

export const DIGITAL_EXAM_FEATURE_KEY = 'digitalExamMaterial';


export const reducerDigitalExam = createReducer(initialState,
  on(actions.InitialGridDataSuccess, (state, { value }: any) => {
    return {
      ...state,
      gridResult: value,
    };
  }),
  on(actions.GridDataBySerachSuccess, (state, { value }: any) => {
    return {
      ...state,
      gridResult: value,
    };
  }),
  on(actions.GroupDataSuccess, (state, { value }: any) => {
    return {
      ...state,
      groupData: value,
    };
  }),
  on(actions.subgroupDataSuccess, (state, { value }: any) => {
    return {
      ...state,
      subgroupData: value,
    };
  }),
  on(actions.subjectDataSuccess, (state, { value }: any) => {
    return {
      ...state,
      subjectData: value,
    };
  }),
  on(actions.subjectByGroupDataSuccess, (state, value) => {
    return {
      ...state,
      subjectData: value
    };
  }),
  on(actions.subjectDataSuccess, (state, { value }: any) => {
    return {
      ...state,
      subjectData: value,
    };
  }),
  on(actions.levelDataSuccess, (state, { value }: any) => {
    return {
      ...state,
      levelData: value,
    };
  }),
  on(actions.optionSuccess, (state, { value }: any) => {
    return {
      ...state,
      optionData: value,
    };
  }),
  on(actions.componentSuccess, (state, { value }: any) => {
    return {
      ...state,
      componentData: value,
    };
  }),
  on(actions.languageSuccess, (state, { value }: any) => {
    return {
      ...state,
      languageData: value,
    };
  }),
  on(actions.subgroupClear, (state, { value }: any) => {
    return {
      ...state,
      subgroupData: [],
      subjectData: [],
      levelData: [],
      optionData: [],
      componentData: [],
      languageData: []
    };
  }),
  on(actions.subjectClear, (state, { value }: any) => {
    return {
      ...state,
      subjectData: [],
      levelData: [],
      optionData: [],
      componentData: [],
      languageData: []
    };
  }),
  on(actions.levelClear, (state, { value }: any) => {
    return {
      ...state,
      levelData: [],
      optionData: [],
      componentData: [],
      languageData: []
    };
  }),
  on(actions.optionClear, (state, { value }: any) => {
    return {
      ...state,
      optionData: [],
      componentData: [],
      languageData: []
    };
  }),
  on(actions.componentClear, (state, { value }: any) => {
    return {
      ...state,
      componentData: [],
      languageData: []
    };
  }),
  on(actions.languageClear, (state, { value }: any) => {
    return {
      ...state,
      languageData: []
    };
  }),
  on(actions.passViewDigitalUploadedData, (state, action) => {
    return {
      ...state,
      selectedDocumentRowData: action.data
    };
  }),
  on(actions.viewPasswordNonMusicSuccess, (state, action) => {
    return {
      ...state,
      passwordData: action.passwordValue
    };
  }),
  on(actions.passUploadGridData, (state, action) => {
    return {
      ...state,
      gridData: action.data
    };
  }),

  on(actions.uploadDigitalDataSuccess, (state, action) => {
    const returnMessage = JSON.parse(JSON.stringify(action.data.response));
    if (returnMessage.success) {
        returnMessage.Message = 'Digital examination materials uploaded successfully';
    } else {
        returnMessage.Message = 'Digital examination materials upload unsuccessfull';
    }
    return {
      ...state,
      apiResponse: returnMessage,
      navigateToList: action.data.IsSuccess,
  };
}),

on(actions.refreshUploadResponseState,(state, action) => {
  return {
         ...state,
         apiResponse: null
     };
}),
);

export function reducer(
  state: InitialState | undefined,
  action: Action
) {
  return reducerDigitalExam(state, action);
}
