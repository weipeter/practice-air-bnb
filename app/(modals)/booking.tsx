import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown, Transition } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { places } from '@/assets/data/places'

import DatePicker from 'react-native-modern-datepicker'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)


const guestsGropus = [
    {
        name: 'Adults',
        text: 'Ages 13 or above',
        count: 0,
    },
    {
        name: 'Children',
        text: 'Ages 2-12',
        count: 0,
    },
    {
        name: 'Infants',
        text: 'Under 2',
        count: 0,
    },
    {
        name: 'Pets',
        text: 'Pets allowed',
        count: 0,
    },
];

const Page = () => {
    const router = useRouter()
    const [openCard, setOpenCard] = useState(0)
    const [selectedPlace, setSelectedPlace] = useState(0)
    const [groups, setGroups] = useState(guestsGropus)

    const onClearAll = () => {
        setOpenCard(0)
        setSelectedPlace(0)
    }

    const today = new Date().toISOString().substring(0, 10);
    return (
        <BlurView intensity={70} style={styles.container} tint='light'>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.card}>
                    {openCard != 0 ? (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(0)}
                            style={styles.cardPreview}
                            entering={FadeIn.duration(200)}
                            exiting={FadeOut.duration(200)}>
                            <Text style={styles.previewText}>想去哪？</Text>
                            <Text style={styles.previewdData}>隨心所欲</Text>
                        </AnimatedTouchableOpacity>) :

                        (<>
                            <Animated.Text entering={FadeIn} style={styles.cardHeader}>有幾個人?</Animated.Text>
                            <Animated.View style={styles.cardBody}>
                                <View style={styles.searchSection}>
                                    <Ionicons name="search" size={20} style={styles.searchIcon} />
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder='搜尋目的地'
                                        placeholderTextColor={Colors.grey} />
                                </View>
                            </Animated.View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 25, paddingLeft: 20, marginBottom: 30 }}>
                                {places.map((item, index) => (
                                    <TouchableOpacity onPress={() => setSelectedPlace(index)} key={index}>
                                        <Image source={item.img}
                                            style={selectedPlace === index ? styles.placeSelected : styles.place} />
                                        <Text style={[{ paddingTop: 6 }, selectedPlace === index ? { fontFamily: 'mon-sb' } : { fontFamily: 'mon' }]}>{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </>
                        )
                    }
                </View>
                <View style={styles.card}>
                    {openCard != 1 ? (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(1)}
                            style={styles.cardPreview}
                            entering={FadeIn.duration(200)}
                            exiting={FadeOut.duration(200)}>
                            <Text style={styles.previewText}>何時出發？</Text>
                            <Text style={styles.previewdData}>選擇日期</Text>
                        </AnimatedTouchableOpacity>)
                        :
                        (
                            <>
                                <Animated.Text entering={FadeIn} style={styles.cardHeader}>何時出發？?</Animated.Text>
                                <Animated.View style={styles.cardBody}>
                                    <DatePicker
                                        options={{
                                            defaultFont: 'mon',
                                            headerFont: 'mon-sb',
                                            mainColor: Colors.primary,
                                            borderColor: 'transparent',
                                        }}
                                        current={today}
                                        selected={today}
                                        mode={'calendar'}
                                    />
                                </Animated.View>
                            </>
                        )
                    }
                </View>
                <View style={[styles.card, { marginBottom: 200 }]}>
                    {openCard != 2 ? (
                        <AnimatedTouchableOpacity
                            onPress={() => setOpenCard(2)}
                            style={styles.cardPreview}
                            entering={FadeIn.duration(200)}
                            exiting={FadeOut.duration(200)}>
                            <Text style={styles.previewText}>有幾個人?</Text>
                            <Text style={styles.previewdData}>選擇人數</Text>
                        </AnimatedTouchableOpacity>)
                        :
                        (<>
                            <Animated.Text entering={FadeIn} style={styles.cardHeader}>有幾個人?</Animated.Text>

                            <Animated.View style={styles.cardBody}>
                                {groups.map((item, index) => (
                                    <View key={index}
                                        style={[
                                            styles.guestItem,
                                            index + 1 < guestsGropus.length ? styles.itemBorder : null,
                                        ]}>
                                        <View>
                                            <Text style={{ fontFamily: 'mon-sb', fontSize: 14 }}>{item.name}</Text>
                                            <Text style={{ fontFamily: 'mon', fontSize: 14, color: Colors.grey }}>
                                                {item.text}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                gap: 10,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const newGroups = [...groups];
                                                    newGroups[index].count =
                                                        newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;

                                                    setGroups(newGroups);
                                                }}>
                                                <Ionicons
                                                    name="remove-circle-outline"
                                                    size={26}
                                                    color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                                                />
                                            </TouchableOpacity>
                                            <Text
                                                style={{
                                                    fontFamily: 'mon',
                                                    fontSize: 16,
                                                    minWidth: 18,
                                                    textAlign: 'center',
                                                }}>
                                                {item.count}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    const newGroups = [...groups];
                                                    newGroups[index].count++;
                                                    setGroups(newGroups);
                                                }}>
                                                <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </Animated.View>
                        </>
                        )
                    }
                </View>
            </ScrollView>
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onClearAll} style={{ justifyContent: 'center' }}>
                        <Text style={{ fontSize: 24, fontFamily: 'mon-sb', textDecorationLine: 'underline' }}>
                            清除全部
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}>
                        <Ionicons name="search-outline" size={24} color={'#fff'} style={defaultStyles.btnIcon} />
                        <Text style={[defaultStyles.btnText]}>
                            查詢
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </BlurView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    cardHeader: {
        fontFamily: 'mon-b',
        fontSize: 24,
        padding: 20,
    },
    cardBody: {
        paddingHorizontal: 20,
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },

    searchSection: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ABABAB',
        borderRadius: 8,
    },
    searchIcon: {
        padding: 10,
    },
    inputField: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    placesContainer: {
        flexDirection: 'row',
        gap: 25,
    },
    place: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    placeSelected: {
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
        width: 100,
        height: 100,
    },
    previewText: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.grey,
    },
    previewdData: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.dark,
    },

    guestItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    itemBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grey,
    },
});

export default Page