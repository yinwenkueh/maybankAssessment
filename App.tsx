import React from 'react';
import { Provider as StoreProvider } from 'react-redux'
import store from './src/configs/store';
import MapViewComponent from './src/components/MapViewComponent';

function App(): React.JSX.Element {
  return (
    <StoreProvider store={store}>
        <MapViewComponent />
    </StoreProvider>

  );
}

export default App;

