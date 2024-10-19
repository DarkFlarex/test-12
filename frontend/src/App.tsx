import AppToolbar from "./UI/AppToolbar/AppToolbar";
import {Container, Typography} from "@mui/material";
import Register from "./features/users/Register";
import Login from "./features/users/login";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import NewPhoto from "./features/Photo/NewPhoto";
import Photos from "./features/Photo/Photos";
import PhotosOneUser from "./features/OnePhotoUser/PhotosOneUser";

function App() {
    const user = useAppSelector(selectUser);
  return (
      <>
          <header>
              <AppToolbar/>
          </header>
          <Container maxWidth="xl" component="main">
              <Routes>
                  <Route path="/" element={<Photos />} />
                  <Route
                  path="/photos/new"
                  element={
                      <ProtectedRoute isAllowed={!!user}>
                          <NewPhoto />
                      </ProtectedRoute>
                  }
              />
              <Route path="/photos/:id" element={<PhotosOneUser />}/>
              <Route path="/register" element={<Register/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
              </Routes>
          </Container>
      </>
  )
}

export default App
