import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Listing } from "@/interface/listing";
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useMemo } from "react";
import Listings from "@/components/Listings";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from "@/constants/Colors";
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface Props {
    listings: Listing[],
    category: string,
}
const ListingBottomSheet = ({ listings, category }: Props) => {
    const snapPoints = useMemo(() => ['10%', '100%'], []);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [refresh, setRefresh] = useState<number>(0);

    const onShowMap = () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh + 1);
    };

    return (

        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{ backgroundColor: Colors.grey }}
        >
            <View style={styles.contentContainer}>
                <Listings listings={listings} refresh={refresh} category={category} />
                <View style={styles.absoluteView}>
                    <TouchableOpacity onPress={onShowMap} style={styles.btn}>
                        <Text style={{ fontFamily: 'mon-sb', color: '#fff' }}>開啟地圖</Text>
                        <Ionicons name="map" size={20} style={{ marginLeft: 10 }} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    absoluteView: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        backgroundColor: Colors.dark,
        padding: 14,
        height: 50,
        borderRadius: 30,
        flexDirection: 'row',
        marginHorizontal: 'auto',
        alignItems: 'center',
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});

export default ListingBottomSheet;
