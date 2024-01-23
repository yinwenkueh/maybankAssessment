import React from 'react';
import { Provider as StoreProvider } from 'react-redux'
import AutoCompleteComponent from './src/components/AutoCompleteComponent';
import store from './src/configs/store';
import MapViewComponent from './src/components/MapViewComponent';
import { SafeAreaView } from 'react-native';
import SearchResultsComponent from './src/components/SearchResultsComponent';

function App(): React.JSX.Element {
  return (
    <StoreProvider store={store}>
      <SafeAreaView style={{ flex: 1 }}>       
        <AutoCompleteComponent />
        <SearchResultsComponent/>
        <MapViewComponent />
      </SafeAreaView>
    </StoreProvider>

  );
}

export default App;

