import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Read from './components/Read';
import SingleUser from './components/SingleUser';
import { useDispatch } from 'react-redux';
import { showUser } from './features/UserDetailSlice';
import { useEffect } from 'react';
import Update from './components/Update';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Create />} />
          <Route exact path='/read' element={<Read />} />
          <Route exact path='/read/:id' element={<SingleUser />} />
          <Route exact path='/update/:id' element={<Update/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
