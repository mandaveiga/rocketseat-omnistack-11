import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationRouteContext } from '@react-navigation/native'

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents() {
    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);

    async function loadIncidents() {
        const response = await api.get('incidentsall');
        setIncidents(response.data);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    function navigateToDetail(incidents) {
        navigation.navigate('Detail', { incidents });
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Bem vindo
                </Text>
            </View>

            <Text style={styles.title}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => incidents.ID}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: incidents }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentPropery}>ONG</Text>
                        <Text style={styles.incidentValue}>{incidents.nome}</Text>


                        <Text style={styles.incidentPropery}>CASO</Text>
                        <Text style={styles.incidentValue}>{incidents.titulo}</Text>

                        <Text style={styles.incidentPropery}>valor</Text>
                        <Text style={styles.incidentValue}>{incidents.valor} R$</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incidents)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={15} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}  