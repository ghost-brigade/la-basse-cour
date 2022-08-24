import './App.css';
import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import Layout from './pages/Layout';
import NoPage from './pages/NoPage';
import LoginPage from './pages/LoginPage';
import ForgottenPasswordPage from './pages/ForgottenPasswordPage';
import AppProvider from './components/prodiver/AppProvider';
import { appPages, getRoutes } from './utils/route_management';
import { useContext, useEffect, useState } from 'react';
import CurrentUserContext from './contexts/user/CurrentUserContext';
import RegisterPage from './pages/RegisterPage';
import LoginEmailPage from './pages/LoginEmailPage';
import BannedPage from './pages/BannedPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes/>
      </BrowserRouter>
    </AppProvider>
  );
}

const AppRoutes = (props) => {
  const [title, setTitle] = useState('');
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

  if (!currentUser) {
    return <Routes>
      <Route path="/login/email/:token" element={<LoginEmailPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="*" element={<LoginPage/>}/>
    </Routes>
  }

  if (currentUser && currentUser.isBanned) {
    return <Routes>
      <Route path="*" element={<BannedPage />}/>
    </Routes>
  }

  return (
    <Routes>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/forgotten-password" element={<ForgottenPasswordPage />}/>
      <Route path="/" element={<Layout title={title}/>}>
        {getRoutes(currentUser).map(page => {
          if (page.path === '/') {
            return <Route index key={page.id} path={page.path} element={page.element} />
          }
          return <Route key={page.id} path={page.path} element={page.element} />
        })}
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
