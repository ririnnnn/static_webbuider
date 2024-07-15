import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditorPages from "./pages/editor";
import View from "./pages/View";
import IndexPage from "./pages";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import ProfilePage from "./pages/profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<IndexPage />} />

            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />

            <Route path="profile" element={<ProfilePage />} />

            <Route path="view" element={<View />} />
            <Route path="edit" element={<EditorPages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
