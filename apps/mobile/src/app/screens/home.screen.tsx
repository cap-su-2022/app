import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Book from "../icons/book.svg";
import ChevronRight from "../icons/chevron-right.svg";
import Blog from "../icons/blog.svg";
import YouTube from "../icons/youtube.svg";
import Pointer from "../icons/pointer.svg";
import Courses from "../icons/courses.svg";
import VSCode from "../icons/vscode.svg";
import NxCloud from "../icons/nx-cloud.svg";
import GitHub from "../icons/github.svg";
import Terminal from "../icons/terminal.svg";
import Heart from "../icons/heart.svg";
import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {ClipboardCheckIcon, ClipboardCopyIcon, ExclamationIcon} from "react-native-heroicons/outline";
import { BLACK, FPT_ORANGE_COLOR, WHITE, YELLOW } from "@app/constants";
import {deviceWidth} from "../utils/device";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { BellIcon } from "react-native-heroicons/solid";

const items = [
  {
    title:"Item 1",
    text: "Text 1",
  },
  {
    title:"Item 2",
    text: "Text 2",
  },
  {
    title:"Item 3",
    text: "Text 3",
  },
  {
    title:"Item 4",
    text: "Text 4",
  },
  {
    title:"Item 5",
    text: "Text 5",
  },
];

const HomeScreen: React.FC = () => {

  const user = useSelector((state: RootState) => state.user.user);

  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigation<NativeStackNavigationProp<any>>();

  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);

  const [sliderWidth, setSliderWidth] = useState<number>(400);
  const [itemWidth, setItemWidth] = useState<number>(350);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const carousel = useRef<Carousel<any>>();

  const carouselItems = ({item, index}) => {
    return (
      <View>
        <Image style={{
          borderRadius: 8,
          height: deviceWidth / 1.65,
        }} source={require('../../../../../assets/library/tv3.jpeg')}/>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
        }}>
          <Text style={styles.textLg}>Hello {user.fullname}</Text>
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: FPT_ORANGE_COLOR,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <BellIcon color={WHITE}/>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.hero}>
              <Carousel
                layout="stack"
                ref={carousel}
                data={items}
                renderItem={carouselItems}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
              />
            <Pagination
              dotsLength={items.length}
              activeDotIndex={activeIndex}
              containerStyle={{ display: 'none' }}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotStyle={{
                // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <View style={[styles.quickAccessContainer]}>
            <Text style={[styles.quickAccessText]}>
              Quick Access
            </Text>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <TouchableOpacity
                style={[styles.quickAccessButton]}
                onPress={() => {
                navigate.navigate("ROOM_BOOKING")
              }}>
                <View style={{
                  margin: 10,
                }}>
                  <ClipboardCopyIcon size={30} color={WHITE}/>
                  <Text style={styles.quickAccessButtonText}>
                    Request for room booking
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                navigate.navigate("ROOM_CHECKOUT");
              }} style={[styles.quickAccessButton]}>
                <View style={{
                  margin: 10,
                }}>
                  <ClipboardCheckIcon size={30} color={WHITE}/>
                  <Text style={styles.quickAccessButtonText}>
                    Check-out booking room
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
             <View style={{
              display: 'flex',
              position: 'absolute',
              top: -10,
              left: -10,
              backgroundColor: YELLOW,
              borderRadius: 50,
              padding: 4,
              borderWidth: 2,
              borderColor: WHITE,
            }}>
              <ExclamationIcon color={WHITE}/>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  quickAccessContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: WHITE,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 8
  },
  quickAccessText: {
    color: BLACK,
    fontWeight: '600',
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10
  },
  quickAccessButton: {
    height: 100,
    width: deviceWidth / 2 - 30,
    backgroundColor: FPT_ORANGE_COLOR,
    margin: 5,
    borderRadius: 8,
  },
  quickAccessButtonText: {
    marginTop: 10,
    fontSize: Platform.OS === 'android' ? 14 : 16,
    fontWeight: '600',
    color: WHITE,
  },
  slide: {
    width: 600,
    height: 200
  },
  slideTitle: {
    color: '#000'
  },
  usernameInput: {
    width: 230,
    height: 30,
    borderColor: 'rgba(0, 0, 0, 1)',
    borderWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 255)',
    borderRadius: 8
  },
  scrollView: {
    backgroundColor: WHITE,
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    color: BLACK,
    fontWeight: '600',
    fontSize: deviceWidth / 21,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitle2: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 9
  },
  heroTitleText: {
    color: WHITE,
    marginLeft: 12,
  },
  heroText: {
    color: WHITE,
    marginVertical: 12,
  },
  whatsNextButton: {
    backgroundColor: WHITE,
    paddingVertical: 12,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
})

export default HomeScreen;
