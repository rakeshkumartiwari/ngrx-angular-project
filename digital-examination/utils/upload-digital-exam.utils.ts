export const fileScanStatus = {
    10: {
        disabled: false, msg: ''
    }
};

export const commonConfig = {
    fileStatusCodesIDs: ['2000011293', '2000011289', '2000011288', '2000011123', '2000011168', '2000011124'],
};

export const fileUploadConfigNonMusic = {
    maxSize: 100,
    singleMaxFileSize: 100 * 1024 * 1024,
    limit: 1,
    allowedFileType: [
        '.mp3', '.aif', '.wav', '.mid', '.zip', '.pdf'
    ],
    allowedMimeType: [
        'audio/mpeg',
        'audio/x-aiff',
        'audio/wav',
        'x-music/x-midi',
        'application/x-zip-compressed',
        'application/pdf'
    ]
};

export const fileUploadConfigMusicMac = {
    maxSize: 200,
    singleMaxFileSize: 200 * 1024 * 1024,
    limit: 1,
    allowedFileType: [
        '.dmg'
    ],
    allowedMimeType: [
        'application/octet-stream',
    ]
};

export const fileUploadConfigMusicWindows = {
    maxSize: 150,
    singleMaxFileSize: 150 * 1024 * 1024,
    limit: 1,
    allowedFileType: [
        '.exe'
    ],
    allowedMimeType: [
        'application/octet-stream',
    ]
};

export const maxUploadFileSize = 1000000;

export const uploadJson = {
    "infDropfile": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "Drop file here to upload"
    },
    "infOr": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "or"
    },
    "btnBrowse": {
        "TranslationStatusId": "111",
        "ControlTypeId": "115",
        "Content": "Browse"
    },
    "infNoOfFileUp": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "file uploaded"
    },
    "infUploading": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "Uploading"
    },
    "infPercentage": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "of 100"
    },
    "infMB": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "MB"
    },
    "infOnly": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "Only"
    },
    "infFileDescallow": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "file allowed for upload"
    },
    "infMBmaxsizeeach": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "MB max size"
    },
    "infFiletypesallow": {
        "TranslationStatusId": "111",
        "ControlTypeId": "122",
        "Content": "File types allowed"
    }
}
