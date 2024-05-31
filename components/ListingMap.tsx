import { View, Text, StyleSheet } from "react-native";
import React, { useRef, memo } from "react";
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { defaultStyles } from "@/constants/Styles";
import { ListingGeo } from "@/interface/listingGeo";
import { useRouter } from "expo-router";
import MapView from "react-native-map-clustering";

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    // 經緯度
    latitude: 52.499586830677025,
    longitude: 13.34589882667451,

    //縮放程度
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

const ListingMap = memo(({ listings }: Props) => {
    const router = useRouter()

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count
        return (
            <Marker
                key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}>
                <View style={styles.marker}>
                    <Text style={{
                        color: '#000',
                        textAlign: 'center',
                        fontFamily: 'mon-sb',
                    }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }
    return (
        <View style={defaultStyles.container}>
            <MapView
                style={StyleSheet.absoluteFill}
                // provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                renderCluster={renderCluster}>
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        onPress={() => onMarkerSelected(item)}
                        key={item.properties.id}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}>
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>${item.properties.price}{' '}TWD </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    },
    locateBtn: {
        position: 'absolute',
        top: 70,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
});

export default ListingMap;
