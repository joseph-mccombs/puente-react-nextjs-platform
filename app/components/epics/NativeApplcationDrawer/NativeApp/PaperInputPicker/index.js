import * as React from 'react';
import {
  Image, Text, TouchableWithoutFeedback, View
} from 'react-native-web';
// import {
//   Button, Headline,
//   TextInput,
// } from 'react-native-paper';
import TextField from '@material-ui/core/TextField';

// import I18n from '../../../modules/i18n';
import { layout, theme } from '../theme';
// import UseCameraRoll from '../../Multimedia/CameraRoll';
// import UseCamera from '../../Multimedia/UseCamera';
import AutoFill from './AutoFill';
import AutoFillMS from './AutoFillMS';
import Geolocation from './Geolocation';
import HouseholdManager from './HouseholdManager';
import {
  styleButton, styles, stylesDefault, stylesPaper, styleX
} from './index.style';
import Looper from './Looper';
import { ThemeProvider } from '@material-ui/styles';

const PaperInputPicker = ({
  data, scrollViewScroll, setScrollViewScroll,
  customForm
}) => {
  const {
    label, formikKey, fieldType, sideLabel
  } = data;

  const translatedLabel =  label || '';
  const translatedLabelSide = sideLabel || '';

  // const [cameraVisible, setCameraVisible] = React.useState(false);
  // const [pictureUris, setPictureUris] = React.useState({});
  // const [image, setImage] = React.useState(null);

  return (
    <>
      {fieldType === 'input' && (
        <View style={stylesDefault.container} key={formikKey}>
          {translatedLabel.length > 30
            && <Text style={stylesDefault.label}>{translatedLabel}</Text>}
          <TextField
            label={translatedLabel}
            variant="outlined"
            // theme={stylesPaper}
            // style={stylesDefault.label}
            color="primary"
          />
        </View>
      )}
      {fieldType === 'numberInput' && (
        <View style={stylesDefault.container} key={formikKey}>
          {translatedLabel.length > 30
            && (
              <Text style={[stylesDefault.label, {
                bottom: -15, zIndex: 1, left: 5, padding: 5
              }]}
              >
                {translatedLabel}
              </Text>
            )}
          <TextField
            label={translatedLabel.length > 30 ? '' : translatedLabel}
            variant="outlined"
            keyboardType="numeric"
            theme={stylesPaper}
            color="primary"
          />
        </View>
      )}
      {fieldType === 'inputSideLabel' && (
        <View style={stylesDefault.container} key={formikKey}>
          <View style={{ flexDirection: 'row' }}>
            <TextField
              label={translatedLabel}
              variant="outlined"
              theme={{ colors: { placeholder: "primary" }, text: 'black' }}
              color="primary"
            />
            <Text style={styleX.sideLabel}>{translatedLabelSide}</Text>
          </View>
        </View>
      )}
      {fieldType === 'inputSideLabelNum' && (
        <View style={stylesDefault} key={formikKey}>
          <View style={{ flexDirection: 'row' }}>
            <TextField
              label={translatedLabel}
              variant="outlined"
              keyboardType="numeric"
              theme={stylesPaper}
              color="primary"
            />
            <Text style={styleX.sideLabel}>{translatedLabelSide}</Text>
          </View>
        </View>
      )}
      {fieldType === 'inputSideLabelTextQuestNumber' && (
        <View style={stylesDefault} key={formikKey}>
          <Text style={stylesDefault.label}>{translatedLabel}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextField
              variant="outlined"
              keyboardType="numeric"
              theme={{ colors: { placeholder: "primary" }, text: 'black' }}
              color="primary"
            />
            <Text style={styleX.sideLabel}>{translatedLabelSide}</Text>
          </View>
        </View>
      )}
      {fieldType === 'inputSideBySideLabel' && (
        <View style={stylesDefault} key={formikKey}>
          <View style={{ flexDirection: 'row' }}>
            <TextField
              label={translatedLabel}
              variant="outlined"
              theme={{ colors: { placeholder: "primary" }, text: 'black' }}
              color="primary"
            />
            <Text style={styleX.sideLabel}>{translatedLabelSide}</Text>
            <TextField
              label={translatedLabel}
              variant="outlined"
              theme={{ colors: { placeholder: "primary" }, text: 'black' }}
              color="primary"
            />
          </View>
        </View>
      )}
      {fieldType === 'select' && (
        <View key={formikKey} style={stylesDefault.container}>
          <Text style={[layout.selectLabel, stylesDefault.label]}>{translatedLabel}</Text>
          <View style={layout.buttonGroupContainer}>
            {data.options && data.options.map((result) => (
              <View key={result.value}>
                {/* non-selected value */}
                  <TouchableWithoutFeedback>
                    <View style={styleButton.unselected} color="primary">
                      <Text style={{ color: "primary" }} color="primary">
                        {result.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
        </View>
      )}
      {fieldType === 'selectMulti' && (
        <View key={formikKey} style={stylesDefault.container}>
          <Text style={[layout.selectLabel, stylesDefault.label]}>{translatedLabel}</Text>
          <View style={layout.buttonGroupContainer}>
            {data.options && data.options.map((result) => (
              <View key={result.value}>
                {/* non-selected value */}
                  <View style={stylesDefault}>
                    <TouchableWithoutFeedback>
                      <View style={styleButton.unselected}>
                        <Text style={{ color: "primary" }}>
                          {result.label}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
              </View>
            ))}
          </View>
        </View>
      )}
      {fieldType === 'autofill' && (
        <View key={formikKey}>
          <AutoFill
            translatedLabel={translatedLabel}
          />
        </View>
      )}
      {fieldType === 'autofillms' && (
        <View key={formikKey}>
          <AutoFillMS
            translatedLabel={translatedLabel}
          />
        </View>
      )}
      {fieldType === 'geolocation' && (
        <Geolocation
          formikKey={formikKey}
        />
      )}
      {fieldType === 'household' && (
        <View key={formikKey}>
          <HouseholdManager />
        </View>
      )}
      {fieldType === 'header' && (
        <View key={translatedLabel} style={stylesDefault.container}>
          <h1>{translatedLabel}</h1>
          <View
            style={stylesDefault.horizontalLine}
          />
        </View>
      )}
      {fieldType === 'multiInputRow' && (
        <View style={stylesDefault.container}>
          <Text style={stylesDefault.label}>{translatedLabel}</Text>
          <View style={stylesDefault.multiInputContainer}>
            {data.options.map((result) => (result.textSplit ? (
              <View key={`${result}`} style={{ flex: 1 }}>
                <Text style={styleX.textSplit}>{result.label}</Text>
              </View>
            ) : (
              <View key={result.value} style={stylesDefault.inputItem}>
                <TextField
                  label={result.label}
                  variant="outlined"
                  theme={{ colors: { placeholder: "primary" }, text: 'black' }}
                />
              </View>
            )))}
          </View>
        </View>
      )}
      {fieldType === 'multiInputRowNum' && (
      <View style={stylesDefault.container}>
        <Text style={stylesDefault.label}>{translatedLabel}</Text>
        <View style={stylesDefault.multiInputContainer}>
          {data.options.map((result) => (result.textSplit ? (
            <View key={`${result}`} style={{ flex: 1 }}>
              <Text style={styleX.textSplit}>{result.label}</Text>
            </View>
          ) : (
            <View key={result.value} style={stylesDefault.inputItem}>
              <TextField
                label={result.label}
                variant="outlined"
                theme={{ colors: { placeholder: "primary" }, text: 'black' }}
              />
            </View>
          )))}
        </View>
      </View>
      )}
      {/* photo not implemented yet */}
      {/* {fieldType === 'photo' && (
        <View style={stylesDefault.container}>
          {!cameraVisible && image === null && (
            <View>
              <Text style={stylesDefault.labelImage}>{translatedLabel}</Text>
              <Button onPress={() => setCameraVisible(true)}>{'Take Photo'}</Button>
              <UseCameraRoll
                pictureUris={pictureUris}
                setPictureUris={setPictureUris}
                formikKey={formikKey}
                image={image}
                setImage={setImage}
              />
            </View>
          )}
          {!cameraVisible && image !== null && (
            <View>
              <Text style={stylesDefault.labelImage}>{translatedLabel}</Text>
              <Image source={{ uri: image }} style={{ width: 'auto', height: 400 }} />
              <Button onPress={() => {
                setCameraVisible(true);
              }}
              >
                {I18n.t('paperButton.takePhoto')}
              </Button>
              <UseCameraRoll
                pictureUris={pictureUris}
                setPictureUris={setPictureUris}
                formikKey={formikKey}
                image={image}
                setImage={setImage}
              />
            </View>
          )}
          {cameraVisible && (
            <View>
              <Text style={stylesDefault.labelImage}>{label}</Text>
              <UseCamera
                cameraVisible={cameraVisible}
                setCameraVisible={setCameraVisible}
                pictureUris={pictureUris}
                setPictureUris={setPictureUris}
                formikKey={formikKey}
                image={image}
                setImage={setImage}
              />
            </View>
          )}
        </View>
      )} */}
      {fieldType === 'loop' && (
      <View key={formikKey}>
        <Looper
          translatedLabel={translatedLabel}
        />
      </View>
      )}
      {/* relies on function to clean the values prior to submission */}
      {fieldType === 'loopSameForm' && (
        <View key={formikKey}>
          <Looper
            translatedLabel={translatedLabel}
          />
        </View>
      )}

    </>
  );
};

export default PaperInputPicker;
