import React from 'react';
import {Route} from 'react-router-dom';
import './css/DashBoardStyle';
import ImageClassification from './page/ImageClassification';
import customModel from './page/customModel';
import dataset from './page/dataset';
import NavBar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Route exact path='/' component={ImageClassification}></Route>
      <Route path='/Custom_Model' component={customModel}></Route>
      <Route path='/dataset' component={dataset}></Route>
    </div>
  );
}

export default App;
