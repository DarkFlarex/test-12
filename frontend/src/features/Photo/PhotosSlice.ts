import {GlobalError} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPhoto} from "./PhotosThunks";

export interface PhotosState {
    isCreating: boolean;
    isCreatingError: GlobalError | null;

}

const initialState: PhotosState = {
    isCreating: false,
    isCreatingError: null,
};

export const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(createPhoto.pending, (state) => {
                state.isCreating = true;
                state.isCreatingError = null;
            })
            .addCase(createPhoto.fulfilled, (state) => {
                state.isCreating = false;
            })
            .addCase(createPhoto.rejected, (state, { payload: error }) => {
                state.isCreating = false;
                state.isCreatingError = error || null;
            });
    },
    selectors:{
        selectPhotoCreate:(state) => state.isCreating,
        selectPhotoCreateError:(state) => state.isCreatingError,
    },
});

export const photosReducer = photosSlice.reducer;

export const {
    selectPhotoCreate,
} = photosSlice.selectors;