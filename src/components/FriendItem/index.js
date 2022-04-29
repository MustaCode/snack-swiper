import React from 'react'
import { Box, Text, Image, HStack, VStack, Pressable } from 'native-base'
import { colors } from '../../assets'
import { Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { db } from '../../../firebase'
import {updateDoc, doc, arrayUnion } from 'firebase/firestore'

const FriendItem = ({data, friendGroupId}) => {

    const handleAddFriend = async (id) => {

          const friendGroupDocRef = doc(db, "friendGroup", friendGroupId);

          await updateDoc(friendGroupDocRef, {
            friends: arrayUnion(id),
        });
    }

    return (
        <Box borderWidth={1} width={'100%'} p={5} borderColor={colors.secondary} borderRadius={10}>
            <HStack space={5} justifyContent='space-between'>
                <HStack space={3}>
                    <Image key={data.img} source={{uri: data.img}} alt='friend' width={50} height={undefined} resizeMode='contain' style={{aspectRatio: 1}} />
                    <VStack>
                        <Text>{data.name}</Text>
                        <Text>{data.username}</Text>
                    </VStack>
                </HStack>

                <Pressable onPress={() => handleAddFriend(data.id)} borderWidth={1} borderRadius={10} px={2} justifyContent='center' alignItems={'center'}>
                    <MaterialCommunityIcons name='plus' size={30} />
                </Pressable>
            </HStack>
        </Box>
    )
}

export default FriendItem