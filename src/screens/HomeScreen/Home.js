import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Text, Item, Icon} from 'native-base';

import {Avatar} from '../../components/Avatar/Avatar';
import {ContactList} from '../../components/ContactList/List';

class Home extends Component {
  state = {
    currentGroup: [],
  };

  // Implimentation of lifecycle methods is done in List Componnet and pure components are used for avatar and item component
  componentDidMount() {}

  onAddContacts = () => {
    this.props.navigation.navigate('ContactScreen');
  };

  render() {
    const params = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Item style={{marginBottom: 10}}>
            <Icon name="md-arrow-back" />
            <Text>Workspace Info</Text>
          </Item>
          <View style={styles.headerIconContainer}>
            <Icon style={styles.headerIcon} type="FontAwesome" name="photo" />
          </View>
          <Text style={styles.headerText}>Group</Text>
        </View>

        <View style={styles.main}>
          <Text>Participants</Text>
          <TouchableOpacity onPress={() => this.onAddContacts()}>
            <View style={styles.mainButton}>
              <Icon
                style={{color: 'red', fontSize: 16, paddingHorizontal: 5}}
                type="AntDesign"
                name="adduser"
              />
              <Text>Add Participants</Text>
            </View>
          </TouchableOpacity>

          <View>
            {params ? (
              <ContactList
                onSelect={() => console.log('Ignore Me')}
                contacts={params.selected}
              />
            ) : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Avatar name="X" />
                <Text>You</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <Button rounded dark block>
            <Text>Save</Text>
          </Button>
          <Button rounded bordered dark block>
            <Text style={{color: 'black'}}>Cancel</Text>
          </Button>
        </View>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flex: 0.3,
    justifyContent: 'space-evenly',
  },
  headerIconContainer: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 68,
  },
  headerText: {
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  main: {flex: 0.5},
  mainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  footer: {flex: 0.2, justifyContent: 'space-around'},
});
