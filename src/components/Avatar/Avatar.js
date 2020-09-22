import React, {PureComponent} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export class Avatar extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onRemove}>
          {this.props.uri ? (
            <Image style={styles.avatar} source={{uri: this.props.uri}} />
          ) : (
            <View style={[styles.avatar, styles.avatarbk]}>
              <Text style={styles.initials}>{this.props.name[0]}</Text>
            </View>
          )}
          {this.props.horizontal ? (
            <View style={styles.avatarNameContainer}>
              <Text style={{fontSize: 8}}>{this.props.name}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarbk: {
    backgroundColor: 'yellow',
  },
  avatarNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  initials: {
    fontSize: 16,
  },
});
