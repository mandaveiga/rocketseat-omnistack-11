import React from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationRouteContext, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Detail() {
    const message = 'Olá Apad, estou entrando em contato, pois gostaria de conttribuir no caso "cadelinha atropelada", com o valor de 120 reais <3';
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incidents;
    navigateBack
    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: [incident.titulo],
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=[incident.whatsapp]texte=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={[styles.incidentPropery, { marginTop: 0 }]}>ONG</Text>
                <Text style={styles.incidentValue}>{incident.nome} de {incident.cidade}</Text>


                <Text style={styles.incidentPropery}>CASO</Text>
                <Text style={styles.incidentValue}>{incident.titulo}</Text>

                <Text style={styles.incidentPropery}>valor</Text>
                <Text style={styles.incidentValue}>{incident.valor}R$</Text>


            </View>
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato</Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}