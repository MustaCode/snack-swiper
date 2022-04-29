import React from 'react'
// import {} from 'react-native'
import { HStack, Text, Box } from 'native-base'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
// import {Ionicons, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';

const Header = ({back}) => {
    return (
        <HStack safeArea alignItems={'center'} justifyContent='space-between' space={3} px={5}>
            <Box>
                <Ionicons name='arrow-back-circle-outline' size={35} onPress={() => back()} />
            </Box>

            <HStack alignItems={'center'} space={3}>
                <MaterialCommunityIcons name='account-heart' size={35} />
                <Text fontSize={22}>
                    Snack Swiper
                </Text>
            </HStack>
            
            <Box/>
        </HStack>
    )
}

export default Header