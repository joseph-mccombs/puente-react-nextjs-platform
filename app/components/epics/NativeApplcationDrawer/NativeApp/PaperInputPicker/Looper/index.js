import React from 'react';
import {
  View
} from 'react-native-web';
import Button from '@material-ui/core/Button'
import {
 stylesDefault,
} from '../index.style';

const Looper = ({
  translatedLabel,
}) => {

  return (
    <View style={stylesDefault.container}>
      <Button variant="outlined" color="primary">
        {'Add additional '}
        {translatedLabel}
      </Button>
    </View>
  );
};

export default Looper;
