import { useAppSelector} from "../../app/hooks";
import {selectPhotoCreate} from "./PhotosSlice";
import {Typography} from "@mui/material";
import PhotoForm from "./components/PhotoForm";

const NewPhoto = () => {
    const isCreating = useAppSelector(selectPhotoCreate);
    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Add new photo
            </Typography>
            <PhotoForm isLoading={isCreating} />
        </>
    );
};

export default NewPhoto;