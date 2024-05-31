import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import React, { useRef, useState } from "react";

import Colors from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from "expo-router";
import * as Haptics from "expo-haptics"

const categories = [
    {
        name: 'Tiny homes',
        icon: 'home',
    },
    {
        name: 'Cabins',
        icon: 'house-siding',
    },
    {
        name: 'Trending',
        icon: 'local-fire-department',
    },
    {
        name: 'Play',
        icon: 'videogame-asset',
    },
    {
        name: 'City',
        icon: 'apartment',
    },
    {
        name: 'Beachfront',
        icon: 'beach-access',
    },
    {
        name: 'Countryside',
        icon: 'nature-people',
    },
];
interface Props {
    onCategoryChanged: (category: string) => void
}
const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null)
    const itemRef = useRef<Array<TouchableOpacity | null>>([])
    const [activeIndex, setActiveIndex] = useState(0)
    const selectCategory = (index: number) => {
        const selected = itemRef.current[index]
        setActiveIndex(index)
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
        })

        // 手機震動
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onCategoryChanged(categories[index].name)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={'/(modals)/booking'} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                                <Text style={{ fontFamily: 'mon', color: Colors.grey }}>Anywhere • Any week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24}></Ionicons>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    ref={scrollRef}
                    horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        gap: 20,
                        paddingHorizontal: 16,
                    }}>
                    {
                        categories.map((item, index) => (
                            <TouchableOpacity key={index}
                                ref={(el) => itemRef.current[index] = el}
                                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                                onPress={() => selectCategory(index)}>
                                <MaterialIcons name={item.icon as any} size={24} color={activeIndex === index ? '#000' : Colors.grey} />
                                <Text
                                    style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                                >{item.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 150,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingTop: 20,
        paddingBottom: 16,
        gap: 20,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});


export default ExploreHeader;
