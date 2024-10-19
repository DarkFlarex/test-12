import React from 'react';
import {Card, CardContent, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import {API_URL} from "../../../constants";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    user: {
        displayName: string;
    }
    title: string;
    image: string;
}

const PhotosOneUserItem:React.FC<Props> = ({user,title,image}) => {
    let cardImage;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Grid item sx={{ width: '330px' }}>
            <Card sx={{ height: '100%' }}>
                <ImageCardMedia image={cardImage} title={title} />
                <CardHeader title={title} />
                    <CardContent>
                        <span>{user.displayName}</span>
                    </CardContent>
            </Card>
        </Grid>
    );
};

export default PhotosOneUserItem;