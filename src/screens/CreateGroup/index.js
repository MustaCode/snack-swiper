import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
// import { View } from 'react-native';
import { Box, VStack, HStack, Text, Button, Input, Checkbox, Icon, Pressable, Modal } from "native-base";
import { useNavigation } from '@react-navigation/native'
import { Header } from '../../components'
import { colors } from '../../assets'
import { Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useDispatch, useSelector } from 'react-redux'
import { setTime, setPeopleNo, setRadius, setRandomSelection, setCuisine, setFriendGroupId } from '../../redux/slices/friend'
import { db } from '../../../firebase'
import { collection, addDoc, getDocs, setDoc } from 'firebase/firestore'
// import { ref, set, child, get } from 'firebase/database'
import { setHours, setMinutes, startOfDay, format } from 'date-fns'

// import firestore from 'firebase/firestore'
const CreateGroup = () => {
  const dispatch = useDispatch()
  const { peopleNo, time, radius, randomSelection, cuisine } = useSelector(state => state.friend)

  const navigation = useNavigation()

  const [single, setSingle] = useState(false)
  // const [peopleNo, setPeopleNo] = useState(null)
  const [randomPerson, setRandomPerson] = useState(false)

  const [date, setDate] = useState(new Date())
  const [openTimeModal, setOpenTimeModal] = useState(false)

  // Time section
  const [timeHour, setTimeHour] = useState(null)
  const [timeMinute, setTimeMinute] = useState(null)

  // RADIUS COMBOBOX
  const [radiusOpen, setRadiusOpen] = useState(false);
  const [radiusValue, setRadiusValue] = useState(null);
  const [radiusData, setRadiusData] = useState([
    { label: '1KM', value: 1 },
    { label: '2KM', value: 2 },
    { label: '3KM', value: 3 },
    { label: '5KM', value: 5 },
    { label: '10KM', value: 10 }
  ]);

  // const [friendGroupId, setFriendGroupId] = useState(0)

  // TIME COMBOBOX
  // const [timeOpen, setTimeOpen] = useState(false);
  // const [timeValue, setTimeValue] = useState(null);
  // const [time, setTime] = useState([
  //   { label: 'Apple', value: 'apple' },
  //   { label: 'Banana', value: 'banana' }
  // ]);

  // CUISINE COMBOBOX
  const [cuisineOpen, setCuisineOpen] = useState(false);
  const [cuisineValue, setCuisineValue] = useState(null);
  const [cuisineData, setCuisineData] = useState([
    { label: 'Italian', value: 'italian' },
    { label: 'Indian', value: 'indian' },
    { label: 'Arab', value: 'arab' },
  ]);

  useEffect(() => {
    // const nameRef = ref(db, 'users/' + userId + '/name');
    // onValue(nameRef, (snapshot) => {
    //   const data = snapshot.val();
    //   updateStarCount(postElement, data);
    // });
    // const userId = 2
    // const dbRef = ref(db);

    // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // });
  }, [])

  // const postUser = (userId, name, email) => {
  //   set(ref(db, 'users/' + userId), {
  //     username: name,
  //     email: email,
  //   });
  // }


  // DATE LIBRARY

  // let groupType = null

  // if (single) {
  //   groupType = 'one person'
  // } else {
  //   groupType = 'group'
  // }

  const handleSaveTime = () => {
    if (!timeHour || !timeMinute) {
      return alert('Please enter time in hours and minutes')
    }

    if (timeHour > 24 || timeHour < 0) {
      return alert('Please enter time hours between 0-24')
    }

    if (timeMinute > 60 || timeMinute < 0) {
      return alert('Please enter time minutes between 0-60')
    }

    // Save time
    // alert(new Date('04-22-2022'))
    const startDay = startOfDay(new Date())
    const selectedTimeHour = setHours(new Date(startDay), timeHour)
    const selectedTime = setMinutes(new Date(selectedTimeHour), timeMinute)
    // alert(selectedTime)
    dispatch(setTime(selectedTime.toString()))
    setOpenTimeModal(false)
  }

  const handleInvite = async () => {
    dispatch(setCuisine(cuisineValue))
    dispatch(setRadius(radiusValue))
    dispatch(setRandomSelection(randomPerson))

    console.log(peopleNo, time, randomPerson, radiusValue, cuisineValue)

    // const postUser = (friendGroupId, peopleNo, time, randomPerson, radius, cuisine) => {
    //   set(ref(db, 'friendGroup/' + friendGroupId), {
    //     peopleNo,
    //     time,
    //     randomPerson,
    //     radius,
    //     cuisine,
    //   });
    // }

    const friendGroupDoc = await addDoc(collection(db, "friendGroup"), {
      peopleNo,
      time,
      randomPerson,
      radius: radiusValue,
      cuisine: cuisineValue,
      friends: []
    });

    // console.log(friendGroupDoc)

    // let friendGroup = friendGroupDoc.data()

    dispatch(setFriendGroupId(friendGroupDoc.id))
    // console.log("Document written with ID: ", friendGroupDoc.id);

    navigation.navigate('InviteFriends')
  }

  return (
    <VStack flex={1} width='100%' height='100%' bgColor={'white'} justifyContent='center'>
      <StatusBar style="auto" />

      <Header />

      <HStack mt={5} justifyContent='space-evenly'>
        <Button width={'35%'} bgColor={colors.primary}>
          <Text>
            Join
          </Text>
        </Button>
        <HStack space={3} alignItems='center'>
          <Ionicons onPress={() => setSingle(true)} name='person' size={30} style={{ backgroundColor: single ? colors.primary : colors.white, padding: 10, borderRadius: 15 }} />
          <FontAwesome onPress={() => setSingle(false)} name='group' size={30} style={{ backgroundColor: !single ? colors.primary : colors.white, padding: 10, borderRadius: 15 }} />
        </HStack>
      </HStack>

      <Text fontSize={25} fontWeight='bold' textAlign={'center'} mt={5}>Create a group</Text>

      {/* Body Section Start */}
      <VStack px={5} mt={5} space={5}>

        <HStack alignItems={'center'}>
          <Text>Number of people in group:</Text>
          <Input value={peopleNo} onChangeText={text => dispatch(setPeopleNo(text))} keyboardType='number-pad' mx="3" placeholder="Input" w="30%" maxWidth="300px" h={35} />
        </HStack>

        <HStack space={4}>
          <Checkbox value={randomPerson} onChange={setRandomPerson} accessibilityLabel="random person" defaultIsChecked={false} colorScheme="purple" />
          <Text>Select a random person to pay</Text>
        </HStack>

        {/* Location and Radius */}
        <VStack space={3}>
          <HStack alignItems={'center'} space={3}>
            <Text>Location:</Text>
            <Input w={{
              base: "75%",
              md: "25%"
            }} InputLeftElement={<Icon as={<Ionicons name="search-sharp" />} size={5} ml="2" color="muted.400" />} placeholder="Search location" />
          </HStack>
          {/* <HStack width={'50%'} alignItems='center' space={2}>
          </HStack>
        
            <Text>Location:</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{ width: '60%' }}
            />
          </HStack> */}

          <HStack width={'100%'} alignItems='center' space={2}>
            <Text>Radius:</Text>
            <DropDownPicker
              open={radiusOpen}
              value={radiusValue}
              items={radiusData}
              setOpen={setRadiusOpen}
              setValue={setRadiusValue}
              setItems={setRadiusData}
              style={{ width: '60%', zIndex: 10 }}
              containerStyle={{ width: '60%' }}
            />
          </HStack>
        </VStack>

        <HStack width={'100%'} alignItems='center' space={2}>
          <Text>Time:</Text>
          <Pressable onPress={() => setOpenTimeModal(true)} borderWidth={1} borderRadius={10} p={3} width={'5/6'}>
            <Text>
              {
                format(new Date(time), 'p')
              }
            </Text>
          </Pressable>
        </HStack>

        {/* <TimePicker /> */}

        {/* <DatePicker date={date} onDateChange={setDate} /> */}

        {/* Time */}
        {/* <HStack alignItems={'center'} space={2}>
          <Text>Time:</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{ width: '60%' }}
          />
        </HStack> */}

        {/* Cuisine */}
        <VStack space={2}>
          <Text>Cuisine:</Text>
          <DropDownPicker
            open={cuisineOpen}
            value={cuisineValue}
            items={cuisineData}
            setOpen={setCuisineOpen}
            setValue={setCuisineValue}
            setItems={setCuisineData}
            style={{ width: '60%', zIndex: -1 }}
          />
        </VStack>

      </VStack>
      {/* Body Section End */}

      <Box flex={1} bgColor='white' justifyContent={'flex-end'} mb={5} mx={5}>
        <Button onPress={() => navigation.navigate('InviteFriends')}>Save</Button>
        <Button bgColor={colors.primary} onPress={handleInvite}>
          <Text>
            Invite
          </Text>
        </Button>
      </Box>


      <Modal isOpen={openTimeModal} onClose={() => setOpenTimeModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Select Time</Modal.Header>
          <Modal.Body>
            <HStack flex={1} justifyContent='space-between'>
              <Input value={timeHour} onChangeText={setTimeHour} keyboardType='number-pad' placeholder="HH" fontSize={30} textAlign='center' w={'45%'} maxLength={2} selectionColor={colors.primary} />
              <Text fontSize={35}>:</Text>
              <Input value={timeMinute} onChangeText={setTimeMinute} keyboardType='number-pad' placeholder="MM" fontSize={30} textAlign='center' w={'45%'} maxLength={2} selectionColor={colors.primary} />
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setOpenTimeModal(false);
              }}>
                Cancel
              </Button>
              <Button onPress={handleSaveTime}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

    </VStack>
  )
}

export default CreateGroup