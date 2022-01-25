import React from 'react';
import {
  StyleSheet, View
} from 'react-native-web';

import { stylesDefault, stylesPaper } from '../index.style';


const AutoFillMS = (props) => {
  const {
     translatedLabel
  } = props;

  return (
    <View style={styles.container}>
        <TextInput
          label={translatedLabel}
          mode="outlined"
          theme={stylesPaper}
          style={stylesDefault.label}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    marginBottom: 75,
  }
});

export default AutoFillMS;
