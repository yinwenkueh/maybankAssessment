import React from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../configs/store';
import { setSearchResults, setSelectedLocation } from '../actions/action';
import Config from 'react-native-config';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

interface AutocompleteComponentProps {
    dispatch: ThunkDispatch<RootState, any, any>;
}

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({ dispatch }) => {
    const handleSelect = (data: any, details: any) => {
        const payload = {
            description: data.description,
            placeId: details.place_id,
            lat: details.geometry.location.lat,
            lng: details.geometry.location.lng,
        };

        dispatch(
            setSearchResults(payload)
        );

        dispatch(
            setSelectedLocation(payload)
        );
    };

    return (
        <View style={{ flex: 0.4, marginTop: Platform.OS === 'ios' ? 25 : 0 }}>
            <GooglePlacesAutocomplete

                enablePoweredByContainer={false}
                placeholder='Search Place'
                minLength={3}
                onPress={(data, details) => handleSelect(data, details)}
                fetchDetails={true}
                styles={{
                    textInputContainer: {
                        backgroundColor: 'grey',
                    },
                    textInput: {
                        marginTop: 5,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    }
                }}
                query={{
                    key: Config.GOOGLE_API_KEY,
                    language: 'en',
                }}
            />
        </View>
    );
};

export default connect()(AutocompleteComponent);
