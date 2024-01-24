import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { RootState } from '../configs/store';
import { setSelectedLocation } from '../actions/action';
import { ThunkDispatch } from 'redux-thunk';

interface SearchResultsComponentProps {
    searchResults: Array<{
        description: string;
        placeId: string;
        lat: number;
        lng: number;
    }>;
    dispatch: ThunkDispatch<RootState, any, any>;
}

const SearchResultsComponent: React.FC<SearchResultsComponentProps> = ({ searchResults, dispatch }) => {
    return (
        searchResults.length > 0 ?
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', }}>History Search Results (Newest on Top):</Text>
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.placeId}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => dispatch(setSelectedLocation(item))} style={{ padding: 5, borderColor: 'orange' }}>
                            <View>
                                <Text>{index + 1 + ". " + item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View> : null
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius:24,
        borderTopRightRadius:24,
        height:'20%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white', // Adjust the transparency here
        padding: 16,
    },
});

const mapStateToProps = (state: RootState) => ({
    searchResults: state.app.searchResults,
});

export default connect(mapStateToProps)(SearchResultsComponent);
