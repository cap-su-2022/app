import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppNavigation } from '../../../hooks/use-app-navigation.hook';
import {
  BLACK,
  FPT_ORANGE_COLOR,
  GRAY,
  INPUT_GRAY_COLOR,
  LIGHT_GRAY,
  WHITE,
} from '@app/constants';
import { deviceWidth } from '../../../utils/device';
import {
  ExclamationCircleIcon,
  HomeIcon,
  LibraryIcon,
  TicketIcon,
} from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/outline';

import SuccessCheckOut from '../../../components/success-checkout.svg';
import StarRating from './rate';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
import Divider from '../../../components/text/divider';
import SuccessfullyCheckedOutFeedback from './modal/successfully-checkout-feedback';
import { FormikValues, useFormik } from 'formik';
import { boxShadow } from '../../../utils/box-shadow.util';
import AlertModal from '../../../components/modals/alert-modal.component';

const feedbackTypeData = [
  {
    label: 'Room facilities',
    value: 'ROOM_FACILITY',
  },
  {
    label: 'Outside room',
    value: 'OUTSIDE_ROOM',
  },
  {
    label: 'Device problems',
    value: 'DEVICE_PROBLEMS',
  },
  {
    label: 'Check-in Procedures',
    value: 'CHECK_IN_PROCEDURES',
  },
  {
    label: 'Check-out Procedures',
    value: 'CHECK_OUT_PROCEDURES',
  },
  {
    label: 'Other',
    value: 'OTHER',
  },
];

const CheckoutSuccessfully: React.FC<any> = () => {
  const navigate = useAppNavigation();
  const [rating, setRating] = useState<number>(0);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState<boolean>(false);
  const [isFeedbackSent, setFeedbackSent] = useState<boolean>(false);

  const Header = () => {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SuccessCheckOut
          height={deviceWidth / 1.75}
          width={deviceWidth / 1.75}
        />
        <Text
          style={{
            color: BLACK,
            fontWeight: '600',
            fontSize: deviceWidth / 20,
          }}
        >
          Successfully checked out the room
        </Text>
      </View>
    );
  };

  const handleSubmit = (values: FormikValues) => {
    if (!values.feedbackType) {
      return alert('Please select a feedback type!');
    }
    alert(JSON.stringify(values));

    // setFeedbackModalOpen(true);
  };

  const [isNotLeavingFeedbackModalOpened, setNotLeavingFeedbackModalOpened] =
    useState(false);

  const NotLeavingFeedbackAlertModal = () => {
    return (
      <AlertModal
        isOpened={isNotLeavingFeedbackModalOpened}
        height={100}
        width={deviceWidth / 1.2}
        toggleShown={() =>
          setNotLeavingFeedbackModalOpened(!isNotLeavingFeedbackModalOpened)
        }
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flex: 1,
            flexGrow: 1,
          }}
        >
          <ExclamationCircleIcon
            color={FPT_ORANGE_COLOR}
            size={deviceWidth / 9}
          />
          <Text
            style={{
              textAlign: 'center',
              paddingHorizontal: 20,
              color: BLACK,
              fontWeight: '500',
              fontSize: deviceWidth / 23,
            }}
          >
            Are you sure don't want to leave a feedback for us?
          </Text>

          <View
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 8,
                borderColor: FPT_ORANGE_COLOR,
                borderWidth: 2,
              }}
            >
              <Text
                style={{
                  color: FPT_ORANGE_COLOR,
                  fontWeight: '500',
                  fontSize: deviceWidth / 234,
                }}
              ></Text>
            </TouchableOpacity>
          </View>
        </View>
      </AlertModal>
    );
  };

  const handleNavigateHome = () => {
    if (!isFeedbackSent) {
      setNotLeavingFeedbackModalOpened(true);
    }
    //navigate.replace('MAIN');
  };

  const handleNavigateBookingRoom = () => {
    navigate.replace('ROOM_BOOKING');
  };

  const formik = useFormik({
    initialValues: {
      rateNum: 5,
      description: undefined,
      feedbackType: undefined,
    },
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NotLeavingFeedbackAlertModal />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.wrapper}
        >
          <Header />

          <Divider num={deviceWidth / 8} />

          <View style={styles.itemContainer}>
            <Text style={styles.title}>Please rate our services</Text>
            <View style={[styles.ratingContainer, boxShadow(styles)]}>
              <StarRating
                rating={formik.values.rateNum}
                setRating={(rate) => setRating(rate)}
              />
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.title}>TELL US MORE</Text>
            <TextInput
              style={[styles.description, boxShadow(styles)]}
              placeholder="Share your thought..."
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.itemContainer}>
            <Text style={styles.title}>FEEDBACK TYPE</Text>
            <RNPickerSelect
              value={formik.values.feedbackType}
              style={pickerStyle}
              onValueChange={(e) => formik.setFieldValue('feedbackType', e)}
              items={feedbackTypeData}
            />
          </View>

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 30,
              height: 100,
            }}
          >
            {isFeedbackSent ? (
              <View style={[styles.submitFeedbackContainer, boxShadow(styles)]}>
                <Text
                  style={{
                    color: WHITE,
                    fontSize: deviceWidth / 19,
                    fontWeight: '600',
                  }}
                >
                  Submit Feedback
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => formik.submitForm()}
                style={[styles.submitFeedbackButton, boxShadow(styles)]}
              >
                <Text style={styles.submitFeedbackButtonText}>
                  Submit Feedback
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => handleNavigateBookingRoom()}
            style={styles.bookAnotherButton}
          >
            <TicketIcon color={FPT_ORANGE_COLOR} size={deviceWidth / 15} />
            <Text style={styles.bookAnotherButtonText}>Book another</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigateHome()}
            style={styles.goToHomeButton}
          >
            <HomeIcon color={WHITE} size={deviceWidth / 15} />
            <Text style={styles.goToHomeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>
      </View>
      <SuccessfullyCheckedOutFeedback
        isOpened={isFeedbackModalOpen}
        setFeedbackSent={(val) => setFeedbackSent(val)}
        setOpened={(val) => setFeedbackModalOpen(val)}
      />
    </SafeAreaView>
  );
};

const pickerStyle: PickerStyle = {
  inputAndroid: {
    height: 50,
    width: deviceWidth / 1.05,
    backgroundColor: WHITE,
    alignSelf: 'center',
  },
  inputIOS: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: deviceWidth / 1.05,
    backgroundColor: WHITE,
    alignSelf: 'center',
  },
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    flex: 1,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  itemContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: GRAY,
    fontSize: deviceWidth / 23,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  ratingContainer: {
    width: deviceWidth / 1.05,
    height: 70,
    backgroundColor: WHITE,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footer: {
    borderTopColor: INPUT_GRAY_COLOR,
    borerTopWidth: 1,
    height: 80,
    backgroundColor: WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bookAnotherButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    width: deviceWidth / 2.1,
    height: 50,
  },
  bookAnotherButtonText: {
    marginLeft: 10,
    color: FPT_ORANGE_COLOR,
    fontSize: deviceWidth / 19,
    fontWeight: '600',
  },
  goToHomeButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: FPT_ORANGE_COLOR,
    borderRadius: 8,
    width: deviceWidth / 2.3,
    height: 50,
  },
  goToHomeButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 19,
    fontWeight: '600',
    margin: 10,
  },
  submitFeedbackButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: FPT_ORANGE_COLOR,
    width: deviceWidth / 1.25,
    height: 50,
  },
  submitFeedbackButtonText: {
    color: WHITE,
    fontSize: deviceWidth / 19,
    fontWeight: '600',
  },
  submitFeedbackContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: GRAY,
    width: deviceWidth / 1.25,
    height: 50,
  },
  description: {
    width: deviceWidth / 1.05,
    height: 100,
    backgroundColor: WHITE,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    paddingHorizontal: 10,
  },
});

export default CheckoutSuccessfully;
