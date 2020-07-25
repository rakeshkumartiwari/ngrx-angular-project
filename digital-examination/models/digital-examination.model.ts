
export interface PageDetail {
    skip: number;
    top: number;
    currentPage: number;
}

export interface InitialState {
    gridResult: {};
    groupData: [];
    subgroupData: [];
    subjectData: [];
    levelData: [];
    optionData: [];
    componentData: [];
    languageData: [];
    selectedDocumentRowData: {};
    passwordData: string;
    gridData: {},
    apiResponse: UploadResponse
}

export interface UploadResponse {
        result: [],
        activityId: string,
        success: boolean,
        errors: [],
        messages: []
}

export enum PackageType {
    yes = 'Yes',
    no = 'No'
}

export interface GridData {
    apComponenetAssocId: number,
    courseId: number,
    languageId: number,
    subjectName?: string,
    levelName?: string,
    optionName?: string,
    componentName?: string,
    languageName?: string,
    versionNumber?: string,
    courseDetails?: string,
    isDownloadAllowed: boolean,
    isUploadAllowed: boolean,
    isEditAllowed: boolean,
    isViewPasswordAllowed: boolean,
    examStartDate?: string,
    session?: string,
    files?: File[]
}

export interface File {
    fileId: number,
    displayName: string,
    fileLink: string,
    isMusicPackage: boolean,
    osVersion: string,
    fileSize: number,
    scanStatus?:string
}

export enum OsVersion {
    WINDOWS = 'windows',
    MAC = 'mac'
}

export enum DocumentsAvailability {
    AVAILABEL = 'available',
    NOT_AVAILABLE = 'notAvailable',
    ALL = 'all'
}

export interface ModelPageDetail {
    skip: number;
    top: number;
    currentPage: number;
}