import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
// import Signup from './Signup'; 
// import Login from './Login';
// import ForgotPassword from './ForgotPassword';

function AuthPage() {
  return (
    <div>
      
      {/* Render nested route */}
      <Outlet />
    </div>
  );
}

export default AuthPage;
