import {GlobalError, Photo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPhoto, deletePhoto, fetchPhotos, fetchPhotosOneUser} from "./PhotosThunks";

export interface PhotosState {
    items: Photo[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;
    item: Photo[];
    oneFetching: boolean;
    deleteLoading: string | false;
}

const initialState: PhotosState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError: null,
    item: [],
    oneFetching: false,
    deleteLoading:false,
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
        builder
            .addCase(deletePhoto.pending, (state, { meta: { arg: itemId } }) => {
                state.deleteLoading = itemId;
            })
            .addCase(deletePhoto.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deletePhoto.rejected, (state) => {
                state.deleteLoading = false;
            });
    },
    selectors:{
        selectPhotos:(state)=>state.items,
        selectPhotosFetching:(state) =>state.itemsFetching,
        selectPhotosOneUser: (state) => state.item,
        selectPhotosOneUserFetching: (state) => state.oneFetching,
        selectPhotoCreate:(state) => state.isCreating,
        selectPhotoCreateError:(state) => state.isCreatingError,
        selectDeletePhotoLoading: (state) => state.deleteLoading,
    },
});

export const photosReducer = photosSlice.reducer;

export const {
    selectPhotos,
    selectPhotosOneUser,
    selectPhotosOneUserFetching,
    selectPhotoCreate,
} = photosSlice.selectors;