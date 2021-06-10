import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './css/style.css';

import App from './App';
import ArticlePage from './articlePage';
import CreateArticle from './createArticlePage';
import Login from './login';
import Register from './register';

ReactDOM.render(
  <>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/articlePage/:id" component={ArticlePage} />
        <Route exact path="/createArticlePage" component={CreateArticle} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
    <ToastContainer />
  </>,
  document.getElementById('root')
);
