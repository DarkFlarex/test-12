import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, Photo, PhotoMutation} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

export const fetchPhotos = createAsyncThunk (
    'photos/fetchAll', async ()=>{
        const {data: photos} = await axiosApi.get<Photo[]>('/photos');
        return photos;
});

export const fetchPhotosOneUser = createAsyncThunk<Photo[], string>(
    'photos/fetchPhotosOne',
    async (id) => {
        const { data: photos } = await axiosApi.get<Photo[]>(`/photos?user=${id}`);
        return photos;
    }
);

export const createPhoto = createAsyncThunk<void, PhotoMutation, { rejectValue: GlobalError; state: RootState }>(
    'photos/create',
    async (photoMutation, { getState, rejectWithValue }) => {

        const token = getState().users.user?.token;

        if (!token) {
            return rejectWithValue({ error: 'User token is missing' });
        }

        const formData = new FormData();
        const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];
        keys.forEach((key) => {
            const value = photoMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        try {
            await axiosApi.post('/photos', formData);
        } catch (e) {
            if (isAxiosError(e) && e.response) {
                return rejectWithValue(e.response.data);
            }
            throw e;
        }
    }
);