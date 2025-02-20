// App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './_helpers/store';  // Предполагается, что у вас есть файл store.js для Redux
import AppRoutes from './Routes';
import Navigation from './_components/Navigation';
import HomePage from './pages/HomePage/HomePage';
import Box from "@mui/material/Box";

const App = () => (
    <Provider store={store}>
      <Router>
        {/*<Navigation test={'test!!!!!'} />*/}
        <Box>
        <AppRoutes />
        </Box>
      </Router>
    </Provider>
);

export default App;
