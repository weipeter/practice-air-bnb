import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb',
      }
    }}>
      <Tabs.Screen
        name="index"
        options={
          {
            tabBarLabel: "探索",
            tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />
          }
        }
      />
      <Tabs.Screen
        name="wishlists"
        options={
          {
            tabBarLabel: "心願單",
            tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" color={color} size={size} />
          }
        }
      />
      <Tabs.Screen
        name="trips"
        options={
          {
            tabBarLabel: "旅程",
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />
          }
        }
      />
      <Tabs.Screen
        name="inbox"
        options={
          {
            tabBarLabel: "收件匣",
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="message-outline" color={color} size={size} />
          }
        }
      />
      <Tabs.Screen
        name="profile"
        options={
          {
            tabBarLabel: "會員",
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />
          }
        }
      />
    </Tabs>
  )
}

export default Layout