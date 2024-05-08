import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
// import Cont from './components/Cont';
import Register from './components/register';
import Login from './components/login';



const App: React.FC = () => {
  return (
      
      
      <BrowserRouter>
        <Routes>

          {/* <Route path='/home' element={<Cont />}/> */}

          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Login />} />



        </Routes>
      </BrowserRouter>
      
      
)
     

}

export default App;
