import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useSelector} from "react-redux";
import {selectPhotosOneUser, selectPhotosOneUserFetching} from "../Photo/PhotosSlice";
import {fetchPhotosOneUser} from "../Photo/PhotosThunks";
import {Alert, Button, CircularProgress, Grid, Typography} from "@mui/material";
import PhotosOneUserItem from "./components/PhotosOneUserItem";
import {NavLink, useParams} from "react-router-dom";
import {selectUser} from "../users/usersSlice";

const PhotosOneUser = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const onePhotosUser = useSelector(selectPhotosOneUser);
    const isFetching = useAppSelector(selectPhotosOneUserFetching);
    const user = useAppSelector(selectUser);
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
                _id={onePhotoUser._id}
                user={onePhotoUser.user}
                title={onePhotoUser.title}
                image={onePhotoUser.image}
            />
        ));
    }

    return (
        <Grid container spacing={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" component="h1">
                      <span>
                            <span>{user ? user.displayName : ''} gallery</span>
                        </span>
                    </Typography>
                    {user && onePhotosUser.find(photo => photo.user._id === user._id) && (
                        <Grid item>
                            <Button component={NavLink} to="/photos/new" color="inherit">
                               Add new photo
                            </Button>
                        </Grid>
                    )}
                </Grid>
                <Grid item container spacing={2} xs={12}>
                    {content}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PhotosOneUser;