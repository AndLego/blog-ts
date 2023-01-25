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
} from "./components/index";
import "./App.css";
import { AuthProvider, AuthRoute } from "./utils/auth";
import { BlogAPIProvider } from "./utils/blogAPI";

function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <BlogAPIProvider>
            <NavBar />

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
              <Route path="/login" element={<LogIn />} />

              <Route
                path="/logout"
                element={
                  <AuthRoute>
                    <LogOut />
                  </AuthRoute>
                }
              />

              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="*" element={<p>Not Found</p>} />
            </Routes>
          </BlogAPIProvider>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
