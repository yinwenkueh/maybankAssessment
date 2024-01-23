import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
        <View style={{ flex: 0.4, padding: 5 }}>
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
        </View>
    );
};

const mapStateToProps = (state: RootState) => ({
    searchResults: state.app.searchResults,
});

export default connect(mapStateToProps)(SearchResultsComponent);
