import "./App.css";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import Hotels from "./components/Hotels/Hotels";
import Header from "./components/Header/Header";
import AppLayout from "./components/AppLayout/AppLayout";
import { Toaster } from "react-hot-toast";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import HotelsProvider from "./context/HotelsProvider";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import BookmarkListProvider from "./context/BookmarkListContext";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Login from "./components/Login/Login";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BookmarkListProvider>
        <HotelsProvider>
          <div className=" w-full min-h-screen pt-4">
            <Toaster />
            <Header />
            <Routes>
              <Route path="/" element={<LocationList />} />
              <Route path="/hotels" element={<AppLayout />}>
                <Route index element={<Hotels />} />
                <Route path=":id" element={<SingleHotel />} />
              </Route>
              <Route
                path="/bookmark"
                element={
                  <ProtectedRoute>
                    <BookmarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Bookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
                <Route path="add" element={<AddNewBookmark />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvider>
  );
}

export default App;
