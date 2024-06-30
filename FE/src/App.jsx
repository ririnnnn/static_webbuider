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

            <Route path="Login" element={<LoginPage />} />
            <Route path="Register" element={<RegisterPage />} />

            <Route path="Profile" element={<ProfilePage />} />

            <Route path="View" element={<View />} />
            <Route path="Edit" element={<EditorPages />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
