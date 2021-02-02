import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Categories from './containers/Categories'
import { configureStore } from './store';
import reducers from './reducers'
import './App.scss';
import { Paper, Container } from '@material-ui/core';
import CategoryDetail from './containers/CategoryDetail';
import { lightGreen, orange } from '@material-ui/core/colors';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import ProductDetail from './containers/ProductDetail';

const store = configureStore(reducers)

const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: orange
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container style={{ paddingBottom: '40px', paddingTop: '40px', display: 'flex', flex: 1 }} maxWidth="lg">
          <Paper elevation={3} style={{ flex: 1 }}>
            <Router>
              <div className="app">
                <Switch>
                  <Route path="/category/:id">
                    <CategoryDetail />
                  </Route>
                  <Route path="/product/:id">
                    <ProductDetail />
                  </Route>
                  <Route path="/">
                    <Categories />
                  </Route>
                </Switch>
              </div>
            </Router>
          </Paper>
        </Container>
      </ThemeProvider>
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
