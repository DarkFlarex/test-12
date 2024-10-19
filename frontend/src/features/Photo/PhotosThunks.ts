import {createAsyncThunk} from "@reduxjs/toolkit";
import {GlobalError, PhotoMutation} from "../../types";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";
import {isAxiosError} from "axios";

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