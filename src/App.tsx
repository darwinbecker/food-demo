import React from 'react';
import './App.css';
import { FoodApp } from './components/Home-Router';
import { SnackbarProvider } from 'notistack';

class App extends React.Component {
  render() {
    return (
      <>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} hideIconVariant >
          <FoodApp />
        </SnackbarProvider>
      </>
    );
  }
}

export default App;
