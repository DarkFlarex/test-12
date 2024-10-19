export interface Photo {
    _id: string;
    user: {
        _id: string;
        displayName: string;
    }
    title: string;
    image: string;
}

export interface PhotoMutation {
    title: string;
    image: string;
}

export interface User {
    _id: string;
    email: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string | null;
    googleID?: string;
}

export interface RegisterMutation {
    email: string;
    password: string;
    displayName: string;
    avatar: string;
}

export interface LoginMutation {
    email: string;
    password: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}