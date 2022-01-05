export interface ITFile {
    file_id: string
    file_unique_id: string
    file_size?: string
}

export interface ITPhotoSize extends ITFile {
    width: number
    height: number
}

interface ITUserProfilePhotos {
    total_count: number
    photos: ITPhotoSize[]
}

type TTFileInfo = ITFile & {file_path:string}

export interface ITFileMethods{
    getUserProfilePhotos: (params: {user_id: number, offset?: number, limit?: number}) => Promise<ITUserProfilePhotos>
    getFile: (params: { fileId: string }) => Promise<TTFileInfo>
    download: (params: TTFileInfo) => Buffer
}