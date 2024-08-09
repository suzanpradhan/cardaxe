import { UserType } from "../user/userType";

export interface ConnectionType {
    id: number;
    to_user: UserType,
    from_user: UserType,
    timeStamp: string,
    accepted: boolean
} 