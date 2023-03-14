import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contact, setContact] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
      );
      if (data.length > 0) {
        setContact(data);
      }
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
        <View style={styles.listcontainer}>
        <Text style={{fontSize: 15}}>{item.name}
        {/* , {item.phoneNumbers[0].number} */}
        </Text>
        </View>}
        data={contact}
        
      /> 
      <Button title="Get Contact" onPress={getContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center'
   },
});
