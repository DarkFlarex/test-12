import React, { useState } from 'react';
import {Card,CardContent,CardHeader,CardMedia,Grid,styled,Dialog,Button,Box} from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constants";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

const StyledLink = styled(Link)({
    color: 'inherit',
    textDecoration: 'none',
});

interface Props {
    user: {
        _id: string;
        displayName: string;
    };
    title: string;
    image: string;
}

const PhotoItem: React.FC<Props> = ({ user, title, image }) => {
    const [open, setOpen] = useState(false);
    let cardImage;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid item sx={{ width: '330px' }}>
            <Card sx={{ height: '100%' }}>
                <ImageCardMedia
                    image={cardImage}
                    title={title}
                    onClick={handleClickOpen}
                />
                <CardHeader title={title} />
                <StyledLink to={`/photos/${user._id}`}>
                    <CardContent>
                        <span>By: {user.displayName}</span>
                    </CardContent>
                </StyledLink>
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

export default PhotoItem;