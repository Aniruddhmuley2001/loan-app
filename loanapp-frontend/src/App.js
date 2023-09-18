import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import UserLogin from './components/userComponents/UserLogin';
import Register from './components/userComponents/Register';
import UserDashboard from './components/userComponents/UserDashboard';
import ViewLoans from './components/userComponents/ViewLoans';
import ViewItems from './components/userComponents/ViewItems';
import ApplyLoan from './components/userComponents/ApplyLoan';
import AdminLogin from './components/adminComponents/AdminLogin';
import AdminDashboard from './components/adminComponents/AdminDashboard';
import UsersList from './components/adminComponents/UsersList';
import UserForm from './components/adminComponents/userData/UserForm';
import AddUserData from './components/adminComponents/userData/AddUserData';

const App = () => {
  return (
    <div className="App">
      <h1>Loan Application</h1>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/user/login" element={<UserLogin/>}/>
        <Route exact path="/admin/login" element={<AdminLogin/>}/>
        <Route exact path="/user/register" element={<Register/>}/>

        <Route path="/user/:id" element={<UserDashboard/>}>
          <Route path="viewLoans" element={<ViewLoans/>}/>
          <Route path="viewItems" element={<ViewItems/>}/>
          <Route path="applyLoan" element={<ApplyLoan/>}/>
        </Route>

        <Route path="/admin/:id" element={<AdminDashboard/>}>
          <Route path="customers" element={<UsersList/>}/>
          <Route path='customers/add' element={<AddUserData/>}/>

          <Route path="viewItems" element={<ViewItems/>}/>
          <Route path="applyLoan" element={<ApplyLoan/>}/>
        </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
