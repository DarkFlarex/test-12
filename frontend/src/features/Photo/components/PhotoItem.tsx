import React from 'react';
import {Card, CardContent, CardHeader, CardMedia, Grid, styled} from "@mui/material";
import {Link} from "react-router-dom";
import {API_URL} from "../../../constants";


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
        _id:string;
        displayName: string;
    }
    title: string;
    image: string;
}

const PhotoItem:React.FC<Props> = ({user,title,image}) => {
    let cardImage;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Grid item sx={{ width: '330px' }}>
            <Card sx={{ height: '100%' }}>
                    <ImageCardMedia image={cardImage} title={title} />
                    <CardHeader title={title} />
                <StyledLink to={`/photos/${user._id}`}>
                    <CardContent>
                        <span>By: {user.displayName}</span>
                    </CardContent>
                </StyledLink>
            </Card>
        </Grid>
    );
};

export default PhotoItem;