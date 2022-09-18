export interface IUser {
    uid: string;
    name: string;
    avatar: string | '';
    age: number | '';
    status: string | '';
    reliations: string | '';
    sex: string | '';
    workPlace: string | '';
    studyPlace: string | '';
}

export interface IShortUser {
    uid: string;
    name: string;
    avatar: string;
}
