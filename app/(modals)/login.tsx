import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { TextInput, TouchableOpacity } from 'react-native'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useOAuth } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

enum Strategy {
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook'
}

const Page = () => {
    useWarmUpBrowser()
    const router = useRouter()
    const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
    const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
    const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

    const onSelectAuth = async (strategy: Strategy) => {
        const selectAuth = {
            [Strategy.Google]: googleAuth,
            [Strategy.Apple]: appleAuth,
            [Strategy.Facebook]: facebookAuth,
        }[strategy]

        try {
            const { createdSessionId, setActive } = await selectAuth()
            if (createdSessionId) {
                setActive!({ session: createdSessionId })
                router.back()
            }
        } catch (err) {
            console.log('OAuth error：', err)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput autoCapitalize='none' placeholder='Email' style={[defaultStyles.inputField, { marginBottom: 30 }]}></TextInput>
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>繼續</Text>
            </TouchableOpacity>
            <View style={styles.seperatorView}>
                <View style={{
                    flex: 1,
                    borderBottomColor: Colors.grey,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
                <Text style={styles.seperator}>或者</Text>
                <View style={{
                    flex: 1,
                    borderBottomColor: Colors.grey,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />
            </View>
            <View style={{ gap: 20 }}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>使用電話簡訊登入</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Apple)}>
                    <Ionicons name="logo-apple" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>使用Apple帳號登入</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
                    <Ionicons name="logo-google" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>繼續使用Google登入</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Facebook)}>
                    <Ionicons name="logo-facebook" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>繼續使用Facebook登入</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 26,
    },
    seperatorView: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 30,
    },
    seperator: {
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },
});

export default Page