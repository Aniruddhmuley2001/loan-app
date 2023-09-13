import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ViewLoan from './components/ViewLoan';

const App = () => {
  return (
    <div className="App">
      <h1>Banking App</h1>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>

        <Route path="/user/:id/viewLoan" element={<ViewLoan/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
