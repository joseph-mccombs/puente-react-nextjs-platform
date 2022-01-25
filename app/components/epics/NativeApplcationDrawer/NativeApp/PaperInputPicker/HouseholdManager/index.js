import React from 'react';
import {
  View,
} from 'react-native-web';

import { layout } from '../../theme';

const HouseholdManager = () => {

  return (
    <View style={layout.formContainer}>
        <View>
            <RadioButton.Group>
              <RadioButton.Item label={'Do Nothing'} value="zero" />
              <RadioButton.Item label={'Create Household'} value="first" />
              <RadioButton.Item label={'Link to Individual'} value="second" />
            </RadioButton.Group>
        </View>
    </View>
  );
};

export default HouseholdManager;
