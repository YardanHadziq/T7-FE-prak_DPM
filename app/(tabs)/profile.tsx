import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {useRouter} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ThemedView} from '@/components/ThemedView';
import {ThemedText} from '@/components/ThemedText';
import {ActivityIndicator, Button, Dialog, PaperProvider, Portal, Text} from 'react-native-paper';
import API_URL from '@/config/config';

type UserProfile = {
    username: string;
    email: string;
};

const ProfileScreen = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [dialogVisible, setDialogVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axios.get<{ data: UserProfile }>(`${API_URL}/api/profile`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setProfile(response.data.data);
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setDialogVisible(true);
    };

    const confirmLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace('/auth/LoginScreen');
    };

    if (loading) {
        return (
            <PaperProvider>
                <ThemedView style={styles.container}>
                    <ActivityIndicator animating={true}/>
                </ThemedView>
            </PaperProvider>
        );
    }

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                {profile ? (
                    <>
                        <Image source={require('../../assets/images/icon.png')} style={styles.banner} />
                        <View style={styles.profileInfoContainer}>
                            <Image source={require('../../assets/images/react-logo.png')} style={styles.profileImage} />
                            <ThemedText style={styles.username}>{profile.username}</ThemedText>
                        </View>
                        <ThemedText style={styles.label}>Email:</ThemedText>
                        <ThemedText style={styles.value}>{profile.email}</ThemedText>
                        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
                            Log Out
                        </Button>
                    </>
                ) : (
                    <ThemedText>No profile data available</ThemedText>
                )}
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Logout</Dialog.Title>
                        <Dialog.Content>
                            <Text>Are you sure you want to logout?</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
                            <Button onPress={confirmLogout}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ThemedView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15202b',
        padding: 16,
    },
    banner: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        backgroundColor: '#192734',
    },
    profileInfoContainer: {
        alignItems: 'center',
        marginTop: -50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#15202b',
        backgroundColor: '#ffffff',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 8,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        color: '#8899a6',
    },
    value: {
        fontSize: 18,
        color: '#ffffff',
    },
    logoutButton: {
        marginTop: 24,
        backgroundColor: '#1da1f2',
    },
});

export default ProfileScreen;
