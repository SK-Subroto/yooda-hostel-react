import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import AdminDashboard from './Pages/Admin/AdminDashboard/AdminDashboard';

import AddFood from './Pages/Admin/AddFood/AddFood';
import ManageFood from './Pages/Admin/ManageFood/ManageFood';
import AddStudent from './Pages/Admin/AddStudent/AddStudent';
import ManageStudent from './Pages/Admin/ManageStudent/ManageStudent';
import Distribution from './Pages/Admin/Distribution/Distribution';
import PageNotFound from './Pages/PageNotFound/PageNotFound';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Admin*/}
          <Route path="/" element={<AdminDashboard />}>
            <Route path="/" element={<Navigate replace to="/admin" />} />
            <Route path="/admin" element={<div className='alert alert-primary fs-1 d-flex justify-content-center align-items-center' style={{ height: '40vh' }}><h2>Welcome</h2></div>}>
            </Route>
            <Route path={`admin/add-food`} element={<AddFood />}>
            </Route>
            <Route path={`admin/manage-food`} element={<ManageFood />}>
            </Route>
            <Route path={`admin/add-student`} element={<AddStudent />}>
            </Route>
            <Route path={`admin/manage-student`} element={<ManageStudent />}>
            </Route>
            <Route path={`admin/distribution`} element={<Distribution />}>
            </Route>
            <Route path="*" element={<PageNotFound />}>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
