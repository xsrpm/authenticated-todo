import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './components/Auth/AuthContext';
import RequireAuth from './components/Auth/RequireAuth';
import RequireNoAuth from './components/Auth/RequireNoAuth';
import { Dashboard } from './pages/Dashboard'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/signin" element={<RequireNoAuth><SignIn /></RequireNoAuth>} />
        <Route path="/signup" element={<RequireNoAuth><SignUp /></RequireNoAuth>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
