import React, {PureComponent, Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

class ContactItem extends PureComponent {
  // const {contact, avatar, onPress, main} = props;

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        {this.props.avatar}
        <View style={styles.subContainer}>
          <Text style={styles.primaryText}>
            {`${this.props.contact.givenName} ${this.props.contact.familyName}`}
          </Text>
          <Text style={styles.secondaryText}>
            {this.props.contact.phoneNumbers[0]
              ? this.props.contact.phoneNumbers[0].number
              : 'N/A'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 5,
  },
  subContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  primaryText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryText: {
    fontSize: 14,
  },
});
