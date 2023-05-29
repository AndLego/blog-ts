import { HashRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  NavBar,
  ProfilePage,
  BlogMain,
  BlogPost,
  LogIn,
  LogOut,
  EditForm,
  Unauthorized,
  Footer,
  MainContainer,
  CreatePost,
  Register,
  Loader
} from "./components/index";
import "./App.css";
import { AuthProvider, AuthRoute } from "./utils/auth";
import { BlogAPIProvider, useAPI } from "./utils/blogAPI";
import Modal from "./components/Modal/Modal";
import React from "react";

function App() {
  const { showModalPost, setShowModalPost, postState, isLoading } = useAPI()

  console.log(isLoading)
  return (
    <>
      <HashRouter>
        <AuthProvider>

          <NavBar />

          {isLoading ? <Loader /> : <></>}

          {
            showModalPost ?
              <Modal
                postState={postState}
                showModalPost={showModalPost}
                setShowModalPost={setShowModalPost} />
              :
              <></>
          }

          <MainContainer>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/blog" element={<BlogMain />}>
                <Route path=":slug" element={<BlogPost />} />
              </Route>

              <Route path="/blog/:slug/edit" element={<EditForm />} />

              {/* protegiendo la ruta profile */}
              <Route
                path="/profile"
                element={
                  <AuthRoute>
                    <ProfilePage />
                  </AuthRoute>
                }
              />
              <Route
                path="/createPost"
                element={
                  <AuthRoute>
                    <CreatePost
                      setShowModalPost={setShowModalPost}
                      showModalPost={showModalPost} />
                  </AuthRoute>
                }
              />
              <Route path="/login" element={<LogIn />} />

              <Route
                path="/logout"
                element={
                  <AuthRoute>
                    <LogOut />
                  </AuthRoute>
                }
              />

              <Route path="/register" element={<Register />} />

              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="*" element={<p>Not Found</p>} />
            </Routes>
          </MainContainer>

          <Footer />

        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
