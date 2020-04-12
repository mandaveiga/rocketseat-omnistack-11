import { StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import Incidents from '.';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 'bold',
    },

    headerText: {
        fontSize: 22,
        marginRight: 20,
        marginTop: 15,
        color: '#e02041',
    },

    title: {
        fontSize: 19,
        marginBottom: 16,
        marginTop: 30,
        color: '#41414d',
        marginLeft: 5,

    },
    incidentList: {
        marginTop: 5,
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    incidentPropery: {
        fontSize: 13,
        color: '#41414d',
        fontWeight: 'bold'
    },
    incidentValue: {
        marginTop: 4,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },
    datailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    datailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    }

});
