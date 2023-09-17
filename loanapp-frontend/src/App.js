import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import ViewLoans from './components/ViewLoans';
import ViewItems from './components/ViewItems';
import ApplyLoan from './components/ApplyLoan';

const App = () => {
  return (
    <div className="App">
      <h1>Loan Application</h1>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>

        <Route path="/user/:id" element={<UserDashboard/>}>
          <Route path="viewLoans" element={<ViewLoans/>}/>
          <Route path="viewItems" element={<ViewItems/>}/>
          <Route path="applyLoan" element={<ApplyLoan/>}/>
        </Route>
        {/* <Route path="/user/:id/viewLoans" element={<ViewLoans/>}/>
        <Route path="/user/:id/viewItems" element={<ViewItems/>}/>
        <Route path="/user/:id/applyLoan" element={<ApplyLoan/>}/> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
