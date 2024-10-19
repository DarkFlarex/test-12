import {GlobalError, Photo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPhoto, fetchPhotos, fetchPhotosOneUser} from "./PhotosThunks";

export interface PhotosState {
    items: Photo[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
    item: Photo[];
    oneFetching: boolean;
}

const initialState: PhotosState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError: null,
    item: [],
    oneFetching: false,
};

export const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchPhotos.pending,(state) =>{
                state.itemsFetching = true;
            })
            .addCase(fetchPhotos.fulfilled,(state,{payload: photos}) =>{
                state.itemsFetching = false;
                state.items = photos;
            })
            .addCase(fetchPhotos.rejected, (state) => {
                state.itemsFetching = false;
            });
        builder
            .addCase(fetchPhotosOneUser.pending, (state) => {
                state.oneFetching = true;
            })
            .addCase(fetchPhotosOneUser.fulfilled, (state, { payload: photosOneUSER }) => {
                state.oneFetching = false;
                state.item = photosOneUSER;
            })
            .addCase(fetchPhotosOneUser.rejected, (state) => {
                state.oneFetching = false;
            });
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
        selectPhotos:(state)=>state.items,
        selectPhotosFetching:(state) =>state.itemsFetching,
        selectPhotosOneUser: (state) => state.item,
        selectPhotosOneUserFetching: (state) => state.oneFetching,
        selectPhotoCreate:(state) => state.isCreating,
        selectPhotoCreateError:(state) => state.isCreatingError,
    },
});

export const photosReducer = photosSlice.reducer;

export const {
    selectPhotos,
    selectPhotosFetching,
    selectPhotosOneUser,
    selectPhotosOneUserFetching,
    selectPhotoCreate,
} = photosSlice.selectors;