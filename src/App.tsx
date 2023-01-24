import { HashRouter, Routes, Route } from "react-router-dom";
import { BlogAPIProvider } from "./utils/blogAPI";
import { Home, BlogMain, NavBar, BlogPost } from "./components/index";

import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
        <BlogAPIProvider>
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/blog" element={<BlogMain />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>
            
          </Routes>
        </BlogAPIProvider>
      </HashRouter>
    </>
  );
}

export default App;
