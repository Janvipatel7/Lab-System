import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header"
import Lab from "./pages/labs/Lab"
import ManageLab from "./pages/labs/ManageLab"
import Pc from "./pages/pcs/Pc"
import ManagePc from "./pages/pcs/ManagePc"
import Student from "./pages/students/Student"
import ManageStudent from "./pages/students/ManageStudent"

const App = () => {
  return (
      <BrowserRouter>
      <Header/>
          <Routes>
              <Route path="/" element={<ProtectedRoute Component={Dashboard}/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/labs" element={<Lab/>} />
              <Route path="/add-lab" element={<ManageLab/>} />
              <Route path="/edit-lab/:labId" element={<ManageLab/>} />
              <Route path="/pcs" element={<Pc/>} />
              <Route path="/add-pc" element={<ManagePc/>} />
              <Route path="/edit-pc/:pcId" element={<ManagePc/>} />
              <Route path="/students" element={<Student/>} />
              <Route path="/add-student" element={<ManageStudent/>} />
          </Routes>
          <ToastContainer/>
      </BrowserRouter>
  )
}

export default App