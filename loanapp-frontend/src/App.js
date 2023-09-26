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
import UsersList from './components/adminComponents/userData/UsersList';
import AddUserData from './components/adminComponents/userData/AddUserData';
import EditUserData from './components/adminComponents/userData/EditUserData';
import ItemsList from './components/adminComponents/itemData/ItemsList';
import LoansList from './components/adminComponents/loanData/LoansList';
import EditLoanData from './components/adminComponents/loanData/EditLoanData';
import AddLoanData from './components/adminComponents/loanData/AddLoanData';
import AddItemData from './components/adminComponents/itemData/AddItemData';
import EditItemData from './components/adminComponents/itemData/EditItemData';
import DeleteData from './components/adminComponents/DeleteData';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
    <div className="App">
      <h1>Loan Application</h1>
      <BrowserRouter>
      <Routes>
        <Route path='*' element={<ErrorPage/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/user/login" element={<UserLogin/>}/>
        <Route exact path="/admin/login" element={<AdminLogin/>}/>
        <Route exact path="/user/register" element={<Register/>}/>

        <Route exact path="/user/:id" element={<UserDashboard/>}>
        <Route exact path="viewLoans" element={<ViewLoans/>}/>
        <Route exact path="viewItems" element={<ViewItems/>}/>
        <Route exact path="applyLoan" element={<ApplyLoan/>}/>
      </Route>

      <Route exact path="/admin/:id" element={<AdminDashboard/>}>
        <Route exact path="customers" element={<UsersList/>}/>
        <Route exact path='customers/add' element={<AddUserData/>}/>
        <Route exact path='customers/:userId' element={<EditUserData/>}/>
        <Route exact path='customers/delete' element={<DeleteData path="customers" />}/>

        <Route exact path="items" element={<ItemsList/>}/>
        <Route exact path="items/add" element={<AddItemData/>}/>
        <Route exact path="items/:itemId" element={<EditItemData/>}/>
        <Route exact path='items/delete' element={<DeleteData path="items"/>}/>

        <Route exact path="loans" element={<LoansList/>}/>
        <Route exact path="loans/add" element={<AddLoanData/>}/>
        <Route exact path='loans/:loanId' element={<EditLoanData/>}/>
        <Route exact path='loans/delete' element={<DeleteData path="loans"/>}/>
      </Route>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
