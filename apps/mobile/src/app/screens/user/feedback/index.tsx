import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import FeedbackIcon from '../../../icons/feedback_1.svg';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  LIGHT_GRAY,
  WHITE,
} from '@app/constants';
import RNPickerSelect from 'react-native-picker-select';
import FeedbackFooter from './feedback.footer';

const FeedbackScreen: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigation();

  const [severity, setSeverity] = useState<string>('MEDIUM');
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<string>();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: WHITE,
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <FeedbackIcon width={deviceWidth / 1.5} height={deviceHeight / 3.5} />
          <Text
            style={{
              color: BLACK,
              fontWeight: '600',
              fontSize: deviceWidth / 20,
              flexWrap: 'wrap',
              textAlign: 'center',
            }}
          >
            Share your experience at FPTU Library
          </Text>
          <View
            style={{
              marginTop: 20,
            }}
          >
            <View
              style={{
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: BLACK,
                    fontSize: deviceWidth / 23,
                    fontWeight: '600',
                  }}
                >
                  Feedback Type
                </Text>
              </View>
              <View>
                <RNPickerSelect
                  style={{
                    inputIOS: {
                      width: deviceWidth / 1.05,
                      height: 40,
                      borderColor: INPUT_GRAY_COLOR,
                      borderWidth: 1,
                      borderRadius: 8,
                    },
                  }}
                  onValueChange={(val) => setSelectedFeedbackType(val)}
                  value={selectedFeedbackType}
                  items={[
                    {
                      label: 'School Facilities',
                      value: 'SCHOOL_FACILITIES',
                    },
                  ]}
                />
              </View>
            </View>

            <View
              style={{
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: BLACK,
                    fontSize: deviceWidth / 23,
                    fontWeight: '600',
                  }}
                >
                  Severity
                </Text>
              </View>
              <View>
                <RNPickerSelect
                  style={{
                    inputIOS: {
                      width: deviceWidth / 1.05,
                      height: 40,
                      borderColor: INPUT_GRAY_COLOR,
                      borderWidth: 1,
                      borderRadius: 8,
                    },
                  }}
                  onValueChange={(val) => setSeverity(val)}
                  value={severity}
                  items={[
                    {
                      label: 'Low',
                      value: 'LOW',
                    },
                    {
                      label: 'Medium',
                      value: 'MEDIUM',
                    },
                    {
                      label: 'High',
                      value: 'HIGH',
                    },
                    {
                      label: 'Urgent',
                      value: 'Urgent',
                    },
                  ]}
                />
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color: BLACK,
                  fontWeight: '600',
                  fontSize: deviceWidth / 23,
                }}
              >
                At FPTU Library, your experience is precious to us!
              </Text>
            </View>
            <TextInput
              multiline
              numberOfLines={10}
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: INPUT_GRAY_COLOR,
                width: deviceWidth / 1.05,
                height: deviceHeight / 6,
              }}
              placeholder="We want to know more about your experience"
            />
          </View>
        </View>
      </ScrollView>
      <FeedbackFooter handlePress={() => null} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default FeedbackScreen;
