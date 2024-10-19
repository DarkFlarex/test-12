import {GlobalError, Photo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createPhoto, fetchPhotos} from "./PhotosThunks";

export interface PhotosState {
    items: Photo[];
    itemsFetching: boolean;
    isCreating: boolean;
    isCreatingError: GlobalError | null;

}

const initialState: PhotosState = {
    items: [],
    itemsFetching: false,
    isCreating: false,
    isCreatingError: null,
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
            .addCase(fetchPhotos.fulfilled,(state,{payload: artists}) =>{
                state.itemsFetching = false;
                state.items = artists;
            })
            .addCase(fetchPhotos.rejected, (state) => {
                state.itemsFetching = false;
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
        selectPhotoCreate:(state) => state.isCreating,
        selectPhotoCreateError:(state) => state.isCreatingError,
    },
});

export const photosReducer = photosSlice.reducer;

export const {
    selectPhotos,
    selectPhotosFetching,
    selectPhotoCreate,
} = photosSlice.selectors;