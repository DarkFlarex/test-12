import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectPhotosOneUser, selectPhotosOneUserFetching} from "../Photo/PhotosSlice";
import {fetchPhotosOneUser} from "../Photo/PhotosThunks";
import {Alert, CircularProgress, Grid, Typography} from "@mui/material";
import PhotosOneUserItem from "./components/PhotosOneUserItem";
import {useParams} from "react-router-dom";

const PhotosOneUser = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const onePhotosUser = useSelector(selectPhotosOneUser);
    const isFetching = useAppSelector(selectPhotosOneUserFetching);

    useEffect(() => {
        dispatch(fetchPhotosOneUser(id));
    }, [dispatch,id]);

    let content:React.ReactNode = <Alert severity="info" sx={{width: '100%'}}>There are no your Photos here!</Alert>;

    if(isFetching) {
        content = <CircularProgress/>;
    } else if (onePhotosUser.length > 0) {
        content = onePhotosUser.map((onePhotoUser) => (
            <PhotosOneUserItem
                key={onePhotoUser._id}
                user={onePhotoUser.user}
                title={onePhotoUser.title}
                image={onePhotoUser.image}
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

export default PhotosOneUser;