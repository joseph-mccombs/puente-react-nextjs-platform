// import { Spinner } from 'native-base';
import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native-web';
// import {
//   Headline,
// } from 'react-native-paper';

// import getLocation from '../../../../modules/geolocation';
// import I18n from '../../../../modules/i18n';
import { layout, theme } from '../../theme';
// import { fulfillWithTimeLimit } from '../../../../modules/utils';
// import PaperButton from '../../../Button';
import Button from '@material-ui/core/Button';
// import PopupError from '../../../PopupError';
import {
  stylesDefault,
 } from '../index.style';

const Geolocation = ({ formikKey }) => {
  return (
    <View key={formikKey} style={stylesDefault.container}>
      <Button
        variant='outlined'
        theme={theme}
        color="primary"
      >
        {'Get Location'}
      </Button>
    </View>
  );
};

export default Geolocation;
