import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAppDispatch } from '../../../hooks/use-app-dispatch.hook';
import FeedbackIcon from '../../../icons/feedback_1.svg';
import { deviceHeight, deviceWidth } from '../../../utils/device';
import { BLACK, INPUT_GRAY_COLOR, WHITE } from '@app/constants';
import FeedbackFooter from './feedback.footer';
import SelectFeedbackTypes from './select-feedback-type';
import { fetchAllFeedBackTypes } from '../../../redux/features/feed-back-type/thunk/fetch-all-feed-back-types.thunk';
import FeedbackTypeModel from '../../../redux/models/feedback-type.model';
import { addNewFeedback } from '../../../redux/features/feedback/thunk/Add-new-feedback.thunk';

const FeedbackScreen: React.FC<any> = () => {
  const dispatch = useAppDispatch();
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<string>();
  const [selectedFeedbackTypeSelections, setSelectedFeedbackTypeSelections] =
    useState([]);
  const [descriptions, setDescriptions] = useState('');
  useEffect(() => {
    dispatch(fetchAllFeedBackTypes())
      .unwrap()
      .then((value) => {
        transformFeedbackTypeToFeedbackTypePicker(value);
      });
    return () => {
      setSelectedFeedbackTypeSelections([]);
    };
  }, []);

  const transformFeedbackTypeToFeedbackTypePicker = (
    value: FeedbackTypeModel[]
  ) => {
    const feedbackTypeSelections = value.map((feedbackType) => {
      return {
        value: feedbackType.id,
        label: feedbackType.name,
      };
    });
    setSelectedFeedbackTypeSelections(feedbackTypeSelections);
    handleSetFeedbackType(feedbackTypeSelections[0].value);
  };

  const handleSetFeedbackType = (value) => {
    if (!value) {
      return setSelectedFeedbackType('Feedback room');
    }
    setSelectedFeedbackType(value);
  };

  const handleSendFeedback = () => {
    dispatch(
      addNewFeedback({
        message: descriptions,
        feedbackTypeId: selectedFeedbackType,
      })
    )
      .unwrap()
      .then(() => {
        alert('Success');
      })
      .catch((e) => {
        console.log(e)
        alert(e);
      });
  };

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
              <View>
                <SelectFeedbackTypes
                  feedbackTypesSelections={selectedFeedbackTypeSelections}
                  feedbackType={selectedFeedbackType}
                  handleSetFeedbackType={(value) =>
                    setSelectedFeedbackType(value)
                  }
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
                paddingHorizontal: 10,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: INPUT_GRAY_COLOR,
                width: deviceWidth / 1.05,
                height: deviceHeight / 6,
                backgroundColor: '#f2f2f2',
                textDecorationColor: BLACK,
                fontSize: deviceWidth / 25,
              }}
              placeholder="We want to know more about your experience"
              textAlignVertical={'top'}
              onChangeText={(value) => setDescriptions(value)}
              value={descriptions}
            />
          </View>
        </View>
      </ScrollView>
      <FeedbackFooter handlePress={() => handleSendFeedback()} />
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
