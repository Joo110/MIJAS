import { Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetCodeForm from './components/ResetCodeForm';
import ResetPasswordForm from './components/ResetPassword';
import HomeWithNavbar from './components/HomeWithNavbar';
import AdminPanel from './components/AdminPanel';
import SuperAdminPanel from './components/SuperAdminPanel';
import ViewMembers from './components/ViewMembers';
import UpdateMember from './components/UpdateMember';
import ViewAdmins from './components/ViewAdmins';
import UpdateAdmin from './components/UpdateAdmin';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
    <Routes>
      {/* ✅ الهوم تبقى الصفحة الرئيسية */}
      <Route path="/" element={<HomeWithNavbar />} />
      
      {/* ✅ صفحة اللوجين تبقى على /login */}
      <Route path="/login" element={<LoginForm />} />

      <Route path="/forgot" element={<ForgotPasswordForm />} />
      <Route path="/reset-code" element={<ResetCodeForm />} />
      <Route path="/reset-password" element={<ResetPasswordForm />} />
      <Route path="/verifyemail" element={<VerifyEmail />} />

      {/* صفحات الأدمن */}
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/superadmin" element={<SuperAdminPanel />} />
      <Route path="/view-members" element={<ViewMembers />} />
      <Route path="/update-member" element={<UpdateMember />} />
      <Route path="/view-admins" element={<ViewAdmins />} />
      <Route path="/update-admin" element={<UpdateAdmin />} />
    </Routes>
  );
}

export default App;
