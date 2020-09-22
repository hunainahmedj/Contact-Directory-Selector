import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Container, Button, Text, Item, Input, Icon} from 'native-base';
import Contacts from 'react-native-contacts';

import {Avatar} from '../../components/Avatar/Avatar';
import {ContactList} from '../../components/ContactList/List';

class AddContact extends Component {
  state = {
    contacts: [],
    selected: [],
    unfilteredList: [],
    loading: true,
  };

  componentDidMount() {
    this.getContactPermission();
  }

  getContactPermission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to access your contact list',
      }).then(() => {
        this.getContactList();
      });
    } else if (Platform.OS === 'ios') {
      this.getContactList();
    }
  };

  getContactList = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.log('Denied');
      } else {
        this.setState({
          contacts,
          unfilteredList: contacts,
          loading: false,
        });
      }
    });
  };

  myfilter = text => {
    const {contacts, unfilteredList} = this.state;
    if (text === '' || text === null) {
      this.setState({contacts: unfilteredList});
    } else {
      const newData = contacts.filter(item => {
        let phone = '';
        if (item.phoneNumbers[0]) {
          phone = item.phoneNumbers[0].number;
        }
        const itemData = `${item.givenName.toUpperCase()} ${item.familyName.toUpperCase()} ${phone}`;
        return itemData.indexOf(text.toUpperCase()) > -1;
      });
      this.setState({contacts: newData});
    }
  };

  filter = text => {
    const {unfilteredList} = this.state;
    const phoneNumberRegex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    if (text === '' || text === null) {
      this.setState({contacts: unfilteredList});
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        if (err) {
        } else {
          this.setState({contacts});
        }
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        if (err) {
        } else {
          this.setState({contacts});
        }
      });
    }
  };

  onSelect = item => {
    const {selected} = this.state;
    const exist = selected.find(i => i.recordID === item.recordID);
    if (exist) {
      let temp = selected;
      temp = selected.filter(j => j.recordID !== item.recordID);
      this.setState({selected: temp});
    } else {
      selected.push(item);
      this.setState({
        selected: selected,
      });
    }
  };

  onDone = () => {
    const {selected} = this.state;
    this.props.navigation.navigate('HomeScreen', {selected});
  };

  onRemove = item => {
    const {selected} = this.state;
    let temp = selected;
    temp = selected.filter(j => j.recordID !== item.recordID);
    this.setState({selected: temp});
  };

  renderSelectedList = ({item}) => {
    return (
      <Avatar
        horizontal={true}
        name={`${item.givenName} ${item.familyName}`}
        uri={item.hasThumbnail ? item.thumbnailPath : null}
        onRemove={() => this.onRemove(item)}
      />
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.header}>
          <Item>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <Icon type="Entypo" name="cross" />
            </TouchableOpacity>
            <Text>Add Participants</Text>
          </Item>

          <View>
            <Item>
              <Input
                placeholder="search by name or by number"
                onChangeText={value => this.myfilter(value)}
              />
            </Item>
          </View>

          <View style={styles.selectedList}>
            <FlatList
              horizontal
              data={this.state.selected}
              renderItem={this.renderSelectedList}
              keyExtractor={item => item.recordID}
            />
          </View>
        </View>

        <View style={styles.main}>
          {this.state.loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <ContactList
              onSelect={this.onSelect}
              contacts={this.state.contacts}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Button rounded block dark onPress={() => this.onDone()}>
            <Text>Done</Text>
          </Button>
          <Button
            rounded
            block
            dark
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Text>Go Back</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default AddContact;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15},
  header: {flex: 0.3, justifyContent: 'space-evenly'},
  main: {flex: 0.5},
  footer: {flex: 0.2, justifyContent: 'space-evenly'},
  selectedList: {justifyContent: 'center', marginVertical: 5},
});
