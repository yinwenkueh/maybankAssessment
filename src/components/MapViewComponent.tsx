import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../configs/store';
import MapView, { Marker } from 'react-native-maps';

interface MapViewComponentProps {
    selectedLocation: {
        description: string;
        lat: number;
        lng: number;
    } | null;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({ selectedLocation }) => {
    if (!selectedLocation) {
        return null
    }

    return (
        <MapView style={{ flex: 1 }} region={{ latitude: selectedLocation?.lat, longitude: selectedLocation?.lng, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
            <Marker
                coordinate={{
                    latitude: selectedLocation?.lat,
                    longitude: selectedLocation?.lng,
                }}
                title={selectedLocation?.description}
                description="Selected Location"
            />
        </MapView>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedLocation: state.app.selectedLocation,
});

export default connect(mapStateToProps)(MapViewComponent);
