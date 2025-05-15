import * as React from 'react';
import CustomThemeProvider from './context/ColorModeContext.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';

function App() {
  return (
    <CustomThemeProvider>
      <MainPage />
    </CustomThemeProvider>
  );
}

export default App;