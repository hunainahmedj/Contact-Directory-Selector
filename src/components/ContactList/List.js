import React, {memo} from 'react';
import {View, FlatList} from 'react-native';
import ContactItem from '../ContactItem/Item';
import {Avatar} from '../Avatar/Avatar';

export const ContactList = memo(({contacts, onSelect}) => {
  const renderItem = ({item}) => {
    console.log('list');
    return (
      <ContactItem
        avatar={
          <Avatar
            name={item.givenName}
            uri={item.hasThumbnail ? item.thumbnailPath : null}
          />
        }
        contact={item}
        onPress={() => onSelect(item)}
      />
    );
  };

  return (
    <View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.recordID}
        initialNumToRender={10}
        windowSize={40}
      />
    </View>
  );
});

export default ContactList;
