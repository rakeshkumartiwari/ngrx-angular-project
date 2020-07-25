import { createFeatureSelector, createSelector } from '@ngrx/store';

const reducerFeatureState = createFeatureSelector<any>('digitalExamMaterial');

export const getGridResult = createSelector(reducerFeatureState, (state) => {
    return state.gridResult
});

export const getGridResultBySerach = createSelector(reducerFeatureState, (state) => {
    return state.gridResult
});

export const getGroupData = createSelector(reducerFeatureState, (state) => {
    return state.groupData;
});

export const getSubgroupData = createSelector(reducerFeatureState, (state) => {
    return state.subgroupData;
});

export const getSubjectData = createSelector(reducerFeatureState, (state) => {
    return state.subjectData;
});

export const getLevelData = createSelector(reducerFeatureState, (state) => {
    return state.levelData;
});

export const getOptionData = createSelector(reducerFeatureState, (state) => {
    return state.optionData;
});

export const getComponentData = createSelector(reducerFeatureState, (state) => {
    return state.componentData;
});

export const getLanguageData = createSelector(reducerFeatureState, (state) => {
    return state.languageData;
});

export const getselectedRowData = createSelector(reducerFeatureState, state => {
    return state.selectedDocumentRowData;
});

export const getPasswordDataToView = createSelector(reducerFeatureState, state => {
    return state.passwordData;
});

export const getUploadGridData = createSelector(reducerFeatureState, state => {
    return state.gridData;
});

export const getUploadResponse = createSelector(
    reducerFeatureState,
    state => {
        return (state && state.apiResponse) ? state.apiResponse : {};
});
