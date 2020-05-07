import React from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import famousModel from './page/model';
import customModel from './page/customModel';
import dataset from './page/dataset';
import NavBar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={famousModel}></Route>
      <Route path='/Custom_Model' component={customModel}></Route>
      <Route path='/dataset' component={dataset}></Route>
    </div>
  );
}

export default App;
