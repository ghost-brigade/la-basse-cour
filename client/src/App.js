import './App.css';
import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import LoginPage from './pages/LoginPage';
import ForgottenPasswordPage from './pages/ForgottenPasswordPage';
import AppProvider from './components/prodiver/AppProvider';
import { appPages } from './utils/route_management';
import { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');

  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/forgotten-password" element={<ForgottenPasswordPage />}/>
            <Route path="/" element={<Layout title={title}/>}>
              {appPages.map(page => {
                if (page.path === '/') {
                  return <Route index path={page.path} element={page.element} />
                }
                return <Route path={page.path} element={page.element} />
              })}
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
