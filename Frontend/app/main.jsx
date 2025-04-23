import { View, Text } from 'react-native'
import React from 'react'
import { useFocusEffect, useRouter } from 'expo-router'

const main = () => {
    const router=useRouter();
    useFocusEffect(()=>{
        router.replace('/login');
    })
  return (
    <View>
      <Text>main</Text>
    </View>
  )
}

export default main