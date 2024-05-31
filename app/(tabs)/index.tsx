import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import Listings from '@/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingMap from '@/components/ListingMap'
import ListingBottomSheet from '@/components/ListingBottomSheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


const Page = () => {
  const [category, setCategory] = useState('Tiny homes')
  const items = useMemo(() => listingsData as any, [])
  const geoItems = useMemo(() => listingsDataGeo, [])
  const onDataChanged = (category: string) => {
    setCategory(category)
  }
  return (

    <GestureHandlerRootView style={{ flex: 1, marginTop: 80, }}>
      {/* <View style={{ flex: 1, marginTop: 150, }}> */}
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged}></ExploreHeader>
        }} />
      {/* <Listings listings={items} category={category} /> */}
      <ListingMap listings={geoItems} />
      <ListingBottomSheet listings={items} category={category} />
      {/* </View> */}
    </GestureHandlerRootView>
  )
}

export default Page