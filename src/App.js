import React from 'react';
import { BrowserRouter, Switch, Route,Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers'
import Home from './pages/Home';
import TariffList from './pages/TariffList';
import Exemption from './pages/Exemption';
import UseState from './pages/UseState';
import AddNewTodo from './pages/AddNewTodo';
import ExamplePages from './pages/ExamplePages';

function App() {
  return (
    <Provider store={createStore(Reducers, applyMiddleware(thunk))}>
      <BrowserRouter>
        <Routes>
          <Route exact path={'/Home'} element={<Home />}/>
          <Route exact path={'/TariffList'} element={<TariffList />}/>
          <Route exact path={'/Exemption'} element={<Exemption />}/>
          <Route exact path={'/UseState'} element={<UseState />}/>
          <Route exact path={'/AddNewTodo'} element={<AddNewTodo />}/>
          <Route exact path={'/ExamplePages'} element={<ExamplePages />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;