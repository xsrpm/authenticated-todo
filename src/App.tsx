import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/Auth/AuthContext';
import RequireAuth from './components/Auth/RequireAuth';
import RequireNoAuth from './components/Auth/RequireNoAuth';
import { TodoComponent } from './components/ToDo/TodoComponent';
import { Dashboard } from './templates/Dashboard'
import { ResetPassword } from './pages/ResetPassword';
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { UpdatePassword } from './pages/UpdatePassword';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path="/" element={<RequireAuth><Dashboard ><TodoComponent /></Dashboard></RequireAuth>} />
        <Route path="/signin" element={<RequireNoAuth><SignIn /></RequireNoAuth>} />
        <Route path="/signup" element={<RequireNoAuth><SignUp /></RequireNoAuth>} />
        <Route path="/reset-password" element={<RequireNoAuth><ResetPassword/></RequireNoAuth>} />
        <Route path="/update-password" element={<Dashboard ><UpdatePassword/></Dashboard>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
