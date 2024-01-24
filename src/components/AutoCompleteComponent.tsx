import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../configs/store';
import { setSearchResults, setSelectedLocation } from '../actions/action';
import Config from 'react-native-config';
import { GooglePlaceData, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
interface AutocompleteComponentProps {
    dispatch: ThunkDispatch<RootState, any, any>;
}

function renderRow(rowData: GooglePlaceData) {
    const desc = rowData.description
    const name = rowData.structured_formatting?.main_text ?? desc;
    const addr = rowData.structured_formatting?.secondary_text ?? desc;

    return (
        <View>
            <Text style={{ color: 'black' }}>{name}</Text>
            <Text numberOfLines={2} style={{ flex: 1 }}>{addr}</Text>
        </View>
    );
}

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({ dispatch }) => {
    useEffect(() => {
        const getPermission = async () => {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: `Application would like to use location permissions`,
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    throw new Error('Location permissions not granted');
                }
                dispatch(setSelectedLocation({
                    description: maybank.description,
                    placeId: maybank.place_id,
                    lat: maybank.geometry.location.lat,
                    lng: maybank.geometry.location.lng,
                }))
            } else {
                dispatch(setSelectedLocation({
                    description: maybank.description,
                    placeId: maybank.place_id,
                    lat: maybank.geometry.location.lat,
                    lng: maybank.geometry.location.lng,
                }))
            }
        }

        getPermission();
    }, []);

    const handleSelect = (data: any, details: any) => {
        const payload = {
            description: data.structured_formatting?.main_text ?? data.description,
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

    const maybank = {
        description: "Menara Maybank",
        place_id: "ChIJwcT1wtNJzDERK72Wi2Bzthc",
        geometry: { location: { lat: 3.1472732, lng: 101.6995352 } },
    };
    const trx = {
        description: "Menara TRX",
        place_id: "ChIJrdNEGO03zDEREvvqiGuWeBA",
        geometry: { location: { lat: 3.1413741, lng: 101.7186221 } },
    };

    return (
        <GooglePlacesAutocomplete
            onFail={(error) => console.log(error)}
            debounce={200}
            enablePoweredByContainer={false}
            placeholder='Search Place'
            minLength={3}
            onPress={(data, details) => handleSelect(data, details)}
            fetchDetails={true}
            styles={{
                container: {
                    position: 'absolute',
                    width: '100%',
                    justifyContent: 'center',
                    top: Platform.OS === 'ios' ? 20 : 0,
                    left: 0,
                    zIndex: 100,
                    elevation: 3,
                },
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
            renderRow={(rowData) => renderRow(rowData)}
            predefinedPlaces={[maybank, trx]}
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
                key: Config.GOOGLE_API_KEY,
                language: 'en',
            }}
        />
    );
};

export default connect()(AutocompleteComponent);
