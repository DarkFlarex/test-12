import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch, } from "../../../app/hooks";
import {PhotoMutation} from "../../../types";
import {createPhoto} from "../PhotosThunks";
import {Grid, TextField} from "@mui/material";
import FileInput from "../../../UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';

interface Props {
    isLoading: boolean;
}

const PhotoForm: React.FC<Props> = ({ isLoading }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [photo, setPhoto] = useState<PhotoMutation>({
        title: '',
        image: '',
    });
    const [showError, setShowError] = useState(false);

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        event.preventDefault();

        if (!photo.image) {
            setShowError(true);
            return;
        }
        try {
            await dispatch(createPhoto(photo)).unwrap();
            navigate('/');
        } catch (err) {
            console.error('Create photo error:', err);
        }
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPhoto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : '';
        setPhoto((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    return (
        <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
            <Grid item>
                <TextField
                    required
                    label="Title"
                    id="title"
                    name="title"
                    value={photo.title}
                    onChange={inputChangeHandler}
                />
            </Grid>
            <Grid item>
                <FileInput
                    label="Image"
                    name="image"
                    onChange={fileInputChangeHandler}
                    errorText={showError && !photo.image ? 'Image is required' : ''}
                />
            </Grid>
            <Grid item>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Grid>
        </Grid>
    );
};

export default PhotoForm;