import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomThemeProvider from './context/ColorModeContext.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import EventPage from './components/EventPage.jsx';

import Layout from './components/Layout.jsx';

function App() {
  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<MainPage />} />
            <Route path="events/:id" element={<EventPage />} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  );
}

export default App;