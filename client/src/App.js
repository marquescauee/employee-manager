import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/AddEmployee';
import ListEmployee from './components/ListEmployee';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route index element={<ListEmployee />}></Route>
          <Route path='/' element={<ListEmployee />}></Route>
          <Route path='/addEmployee' element={<AddEmployee />}></Route>
        </Routes>
 
      </BrowserRouter>
    </>
  );
}

export default App;
