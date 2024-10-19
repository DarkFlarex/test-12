import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPhotoCreate, selectPhotos} from "./PhotosSlice";
import {fetchPhotos} from "./PhotosThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import PhotoItem from "./components/PhotoItem";

const Photos = () => {
    const dispatch = useAppDispatch();
    const photos = useAppSelector(selectPhotos);
    const isFetching = useAppSelector(selectPhotoCreate);

    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no Photos here!</Alert>;

    if(isFetching) {
        content = <CircularProgress/>;
    } else if (photos.length > 0) {
        content = photos.map((photo) => (
            <PhotoItem
                key={photo._id}
                _id={photo._id}
                user={photo.user}
                title={photo.title}
                image={photo.image}
            />
        ));
    }
    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1">
                      Photo Gallery
                    </Typography>
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Photos;