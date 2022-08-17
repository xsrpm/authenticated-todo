import { Routes, Route } from "react-router-dom";
import { Dashboard } from './components/Dashboard'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
