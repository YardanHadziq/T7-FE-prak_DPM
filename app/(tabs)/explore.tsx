import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Avatar, Card, IconButton } from 'react-native-paper';

const ExploreScreen = () => {
    const [posts, setPosts] = useState([
        {
            id: '1',
            user: 'Fathir',
            avatar: 'https://via.placeholder.com/150',
            content: 'Lagi nobar temen malah udh kelar ae.',
            timestamp: '2h ago',
        },
        {
            id: '2',
            user: 'Revaldo',
            avatar: 'https://via.placeholder.com/150',
            content: 'p -1 valo',
            timestamp: '4h ago',
        },
        {
            id: '3',
            user: 'Aksa',
            avatar: 'https://via.placeholder.com/150',
            content: 'pengen ngasih tau tapi yaudahlah',
            timestamp: '1d ago',
        },
        {
            id: '4',
            user: 'Nadif',
            avatar: 'https://via.placeholder.com/150',
            content: 'info yg mau joki dm aku',
            timestamp: '2d ago',
        },
    ]);

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title} type="title">For You Page</ThemedText>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Title
                            title={item.user}
                            subtitle={item.timestamp}
                            titleStyle={styles.userText}
                            subtitleStyle={styles.timestampText}
                            left={(props) => <Avatar.Image {...props} source={{ uri: item.avatar }} />}
                            right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
                        />
                        <Card.Content>
                            <ThemedText style={styles.contentText}>{item.content}</ThemedText>
                        </Card.Content>
                    </Card>
                )}
                contentContainerStyle={styles.listContainer}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15202B',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1DA1F2',
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#192734',
    },
    userText: {
        color: '#FFFFFF',
    },
    timestampText: {
        color: '#FFFFFF',
    },
    contentText: {
        color: '#FFFFFF',
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default ExploreScreen;
