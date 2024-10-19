import React, {useCallback, useState} from 'react';
import {Box, Button, Card, CardContent, CardHeader, CardMedia, Dialog, Grid, IconButton, styled} from "@mui/material";
import { API_URL } from "../../../constants";
import { useAppDispatch } from "../../../app/hooks";
import {deletePhoto, fetchPhotosOneUser} from "../../Photo/PhotosThunks";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectUser } from "../../users/usersSlice";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    _id: string;
    user: {
        _id: string;
        displayName: string;
    };
    title: string;
    image: string;
}

const PhotosOneUserItem: React.FC<Props> = ({ _id, user, title, image }) => {
    const dispatch = useAppDispatch();
    const currentUser = useSelector(selectUser);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    let cardImage;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    const handleDelete = useCallback(async () => {
        if (window.confirm('Are you sure you want to delete this Photo?')) {
            try {
                await dispatch(deletePhoto(_id)).unwrap();
                await dispatch(fetchPhotosOneUser(user._id)).unwrap();
            } catch (error) {
                console.error('Delete photo error: ', error);
            }
        }
    }, [dispatch, _id]);

    return (
        <Grid item sx={{ width: '330px' }}>
            <Card sx={{ height: '100%' }}>
                <ImageCardMedia image={cardImage} title={title}  onClick={handleClickOpen}/>
                <CardHeader title={title} />
                <CardContent>
                    <span>{user.displayName}</span>
                </CardContent>
                {currentUser && (currentUser.role === 'admin' || user._id === currentUser._id) && (
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        Delete <DeleteIcon fontSize="inherit" />
                    </IconButton>
                )}
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box
                    sx={{
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CardMedia
                        component="img"
                        image={cardImage}
                        alt={title}
                        sx={{
                            maxHeight: '500px',
                            width: '100%',
                            objectFit: 'contain',
                            marginBottom: '20px',
                        }}
                    />
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        sx={{ width: '90px' }}
                    >
                        Close
                    </Button>
                </Box>
            </Dialog>
        </Grid>
    );
};

export default PhotosOneUserItem;
