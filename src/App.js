import Homep1 from './components/Homep1';
import Research from './components/Research';
import Login from './components/Login';
import Adash from './components/Adash';
import Analysis from './components/Analysis';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Predict from './components/Predict';
import Data from './components/Data';
import ImageUpload from './components/ImageUpload';
import Hist from './components/Hist';
import Endopred from './components/Endopred';
import React from 'react';
import PhSignUp from './components/PhSignUp,js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

export default function App() {
    return(
    <Router>
      <Routes>
      <Route path='/' element={<Homep1/>}/>
      <Route path='/research' element={<Research/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/adash' element={<Adash/>}/>
      <Route path='/analysis' element={<Analysis/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/phsignup' element={<PhSignUp/>}/>
      <Route path='/predict' element={<Predict/>}/>
      <Route path='/data' element={<Data/>}/>
      <Route path='/yolopred' element={<ImageUpload/>}/>
      <Route path='/hist' element={<Hist/>}/>
      <Route path='/endo' element={<Endopred/>}/>
      {/* <Route path='*' element={<ErrorPage/>}/> */}
    </Routes> 
    </Router>
    );
};

