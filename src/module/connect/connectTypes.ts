
export interface ConnectionType {
    id: number;
    to_user: ConnectUserType,
    from_user: ConnectUserType,
    timestamp: string,
    accepted: boolean
}

export interface ConnectUserType {
    fullname: string;
    username: string;
    email: string;
    avatar?: string;
    id?: number;
}