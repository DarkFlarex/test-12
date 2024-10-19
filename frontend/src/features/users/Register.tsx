import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {RegisterMutation} from "../../types";
import {register} from "./usersThunks";
import {Avatar, Box, Button, Grid, Link, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {selectRegisterError} from "./usersSlice";
import FileInput from "../../UI/FileInput/FileInput";

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectRegisterError);

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: '',
        displayName: '',
        avatar: '',
    });

    const getFieldError = (fieldName: string) => {
        return error?.errors[fieldName]?.message;
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate('/');
        } catch (e) {
            console.error('Registration error:', e);
        }
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = event.target;
        const value = files && files[0] ? files[0] : null;
        console.log('Selected file:', value);
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Box
            sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            required
                            label="Email"
                            name="email"
                            autoComplete="new-email"
                            value={state.email}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('email'))}
                            helperText={getFieldError('email')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            type="password"
                            label="Password"
                            name="password"
                            autoComplete="new-password"
                            value={state.password}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('password'))}
                            helperText={getFieldError('password')}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            label="Display Name"
                            id="displayName"
                            name="displayName"
                            value={state.displayName}
                            onChange={inputChangeHandler}
                            error={Boolean(getFieldError('displayName'))}
                            helperText={getFieldError('displayName')}
                        />
                    </Grid>

                    <Grid item>
                        <FileInput
                            label="Avatar"
                            name="avatar"
                            onChange={fileInputChangeHandler}
                            errorText={getFieldError('avatar')}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign up
                </Button>
                <Link component={RouterLink} to="/login" variant="body2">
                    Already have an account? Sign in
                </Link>
            </Box>
        </Box>
    );
};

export default Register;