import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/AddEmployee';
import ListEmployee from './components/ListEmployee';
import Navbar from './components/Navbar';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route index element={<ListEmployee />}></Route>
          <Route path='/' element={<ListEmployee />}></Route>
          <Route path='/addEmployee' element={<AddEmployee />}></Route>
          <Route path='/editEmployee/:id' element={<UpdateEmployee />}></Route>
        </Routes>
 
      </BrowserRouter>
    </>
  );
}

export default App;
