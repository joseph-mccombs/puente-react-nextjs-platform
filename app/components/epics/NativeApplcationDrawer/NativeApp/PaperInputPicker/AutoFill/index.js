import React, { Component } from 'react';
import {
  StyleSheet, View
} from 'react-native-web';

import { theme } from '../../theme';
import { stylesDefault, stylesPaper } from '../index.style';

export default class AutoFill extends Component {

  render() {
    const {
      translatedLabel,
    } = this.props;


    return (
      <View style={styles.container}>
        {/* handle issues where autofil does not populate any data */}
          <TextInput
            label={translatedLabel}
            mode="outlined"
            theme={stylesPaper}
            style={stylesDefault.label}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginBottom: 75,
  }
});
