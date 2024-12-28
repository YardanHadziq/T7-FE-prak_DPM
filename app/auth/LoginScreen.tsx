import React, {useState} from "react";
import {Image, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {useRouter} from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/ThemedView";
import {Button, Dialog, PaperProvider, Portal} from "react-native-paper";
import API_URL from "../../config/config";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
            const { token } = response.data.data;
            await AsyncStorage.setItem("token", token);
            router.replace("/(tabs)");
            setDialogMessage("Login successful!");
            setIsSuccess(true);
            setDialogVisible(true);
        } catch (error) {
            const errorMessage = (error as any).response?.data?.message || "An error occurred";
            setDialogMessage(errorMessage);
            setIsSuccess(false);
            setDialogVisible(true);
        }
    };

    const handleDialogDismiss = () => {
        setDialogVisible(false);
        if (isSuccess) {
            router.replace("/(tabs)");
        }
    };

    return (
        <PaperProvider>
            <ThemedView style={styles.container}>
                <Image source={require("../../assets/images/switter1.png")} style={styles.logo} />
                <Text style={styles.title}>Welcome to Switter!</Text>
                <Text style={styles.subtitle}>Log in to your account</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#8899A6"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#8899A6"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => router.push("/auth/RegisterScreen")}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
                        <Dialog.Title>{isSuccess ? "Success" : "Login Failed"}</Dialog.Title>
                        <Dialog.Content>
                            <Text>{dialogMessage}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleDialogDismiss}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </ThemedView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#15202B",
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 24,
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#FFFFFF",
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 24,
        color: "#8899A6",
    },
    input: {
        width: "100%",
        height: 48,
        borderColor: "#38444D",
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 12,
        marginBottom: 16,
        backgroundColor: "#192734",
        color: "#FFFFFF",
    },
    loginButton: {
        width: "100%",
        height: 48,
        backgroundColor: "#1DA1F2",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    registerButton: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#1DA1F2",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    registerButtonText: {
        color: "#1DA1F2",
        fontSize: 16,
        fontWeight: "600",
    },
});
