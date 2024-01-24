import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../configs/store';
import MapView, { Marker } from 'react-native-maps';
import AutoCompleteComponent from './AutoCompleteComponent';
import SearchResultsComponent from './SearchResultsComponent';
import { SafeAreaView } from 'react-native';

interface MapViewComponentProps {
    selectedLocation: {
        description: string;
        lat: number;
        lng: number;
    } | null;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({ selectedLocation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {selectedLocation ?
                <MapView
                    style={{ flex: 1 }}
                    region={{ latitude: selectedLocation?.lat, longitude: selectedLocation?.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                    <Marker
                        coordinate={{
                            latitude: selectedLocation?.lat,
                            longitude: selectedLocation?.lng,
                        }}
                        title={selectedLocation?.description}
                        description="Selected Location"
                    />
                </MapView>
                : null
            }
            <SearchResultsComponent />
            <AutoCompleteComponent />
        </SafeAreaView>

    );
};

const mapStateToProps = (state: RootState) => ({
    selectedLocation: state.app.selectedLocation,
});

export default connect(mapStateToProps)(MapViewComponent);
