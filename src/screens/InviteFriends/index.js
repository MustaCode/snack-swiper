import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
// import { View } from 'react-native';
import { Input, Box, VStack, HStack, Text, Button, Icon, FlatList, Skeleton } from "native-base";
import { useNavigation } from '@react-navigation/native'
import { Header, FriendItem } from '../../components';
import { colors } from '../../assets';
import { Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux'
import { collection, addDoc, getDocs, setDoc } from 'firebase/firestore'

// import { ref, set, child, get, query } from 'firebase/database'
import { db } from '../../../firebase'

const InviteFriends = () => {
    const navigation = useNavigation()
    const { peopleNo, time, radius, randomSelection, cuisine, friendGroupId } = useSelector(state => state.friend)

    const [friends, setFriends] = useState([])

    const [searchFriend, setSearchFriend] = useState(null)

    const [emptyFlag, setEmptyFlag] = useState(false)

    useEffect(async () => {
        // let mObj = {}
        // mObj.a = 'aaa'
        // console.log(mObj)
        const querySnapshot = await getDocs(collection(db, "friends"));
        // const docRef = doc(db, "friends");
        // const docSnap = await getDocs(docRef);
        let friendsArray = []
        querySnapshot.forEach((doc) => {
            let friendsData = doc.data()
            friendsData.id = doc.id
            console.log('data: ', friendsData)
            friendsArray.push(friendsData)
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.data());
        });
        setFriends(friendsArray)
        // console.log(querySnapshot.data)
        // const userId = 1
        // const dbRef = ref(db);

        // const recentPostsRef = query(ref(db, 'friends'));
        // console.log(recentPostsRef)

        // get(child(dbRef, `friends`)).then((snapshot) => {
        //     if (snapshot.exists()) {
        //         setFriends(snapshot.val())
        //         console.log(snapshot.val().img);
        //     } else {
        //         console.log("No data available");
        //     }
        // }).catch((error) => {
        //     console.error(error);
        // });


    }, [emptyFlag])

    // const friends = [
    //     {
    //         id: 1,
    //         name: 'Ahmad',
    //         username: '@ahmad',
    //         img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png'
    //     },
    //     {
    //         id: 2,
    //         name: 'Saeed',
    //         username: '@saeed',
    //         img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png'
    //     },
    //     {
    //         id: 3,
    //         name: 'Raghad',
    //         username: '@mohd',
    //         img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png'
    //     },
    //     {
    //         id: 4,
    //         name: 'Mohammad',
    //         username: '@mohd',
    //         img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png'
    //     },
    //     {
    //         id: 5,
    //         name: 'Mohammad',
    //         username: '@mohd',
    //         img: 'https://cdn-icons-png.flaticon.com/512/1256/1256650.png'
    //     }
    // ]

    const handleGenerateCode = () => {
        const groupCode = Math.floor(10000000 +  Math.random() * 90000000)

        alert(groupCode)
    }
    

    const handleSetSearchFriend = value => {

        if (value == '') {
            setEmptyFlag(!emptyFlag)
        }

        let searchResult = []
        friends.forEach(friend => {
            console.log(typeof friend.name)
            if (friend?.name?.includes(value)) {
                
                searchResult.push(friend)
            }
        })

        setFriends(searchResult)

        setSearchFriend(value)
    }

    const renderFriends = ({ item }) => <FriendItem data={item} friendGroupId={friendGroupId} />

    return (
        <VStack width='100%' height='100%' bgColor={'white'}>
            <StatusBar style="auto" />
            <Header back={navigation.goBack} />

            {/* Body */}
            <VStack justifyContent={'center'} alignItems='center' space={5} mt={5} flex={1}>
                <Input
                onChangeText={value => handleSetSearchFriend(value)}
                value={searchFriend}
                w={{
                    base: "75%",
                    md: "25%"
                }} InputLeftElement={<Icon as={<Ionicons name="search-sharp" />} size={5} ml="2" color="muted.400" />} placeholder="Search" />

                <Box flex={1} alignSelf={'center'} width='75%'>
                    {
                        friends ? (
                            <FlatList
                                keyExtractor={item => item.id}
                                data={friends}
                                renderItem={renderFriends}
                                // style={{ width: '100%' }}
                                contentContainerStyle={{ width: '100%' }}
                                ItemSeparatorComponent={() => <Box my={1} />}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <VStack w="100%" maxHeight={'100%'} p={3} borderWidth="1" space={8} overflow="hidden" rounded="md" _dark={{
                                borderColor: "coolGray.800"
                            }} _light={{
                                borderColor: "coolGray.300"
                            }}>
                                <HStack space={3}>
                                    <Skeleton size={16} rounded='full' />
                                    <Skeleton.Text pr={3} flex={1} />
                                </HStack>
                                <HStack space={3}>
                                    <Skeleton size={16} rounded='full' />
                                    <Skeleton.Text pr={3} flex={1} />
                                </HStack>
                                <HStack space={3}>
                                    <Skeleton size={16} rounded='full' />
                                    <Skeleton.Text pr={3} flex={1} />
                                </HStack>
                            </VStack>
                        )
                    }

                </Box>

                {/* <FriendItem />
                <FriendItem />
                <FriendItem /> */}
                <VStack space={5} flex={1} width='75%'>
                    {/* <Button onPress={() => console.log(friends)} bgColor={colors.primary}><Text>Send link</Text></Button> */}
                    <Button onPress={handleGenerateCode} bgColor={colors.primary}><Text>Generate Code</Text></Button>

                    <Button bgColor={colors.primary} mt={25}><Text>Create</Text></Button>
                </VStack>



            </VStack>
        </VStack>
    )
}

export default InviteFriends