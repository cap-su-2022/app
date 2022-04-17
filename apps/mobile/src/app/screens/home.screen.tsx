import {Linking, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
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
import {styles} from "./styles/home.style";

const HomeScreen = () => {

  const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(0);
  const scrollViewRef = useRef<null | ScrollView>(null);

  return (


    <SafeAreaView>
      <ScrollView
        ref={(ref) => {
          scrollViewRef.current = ref;
        }}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.section}>
          <Text style={styles.textLg}>Hello there,</Text>
          <Text style={[styles.textXL, styles.appTitleText]} testID="heading">
            Welcome back!
          </Text>
        </View>
        <View style={styles.section}>
          <View style={styles.hero}>
            <View style={styles.heroTitle}>
              <TextInput style={styles.usernameInput} placeholder="Enter username"/>
            </View>
            <View style={styles.heroTitle2}>
              <TextInput style={styles.usernameInput} placeholder="Enter password"/>
            </View>
            <TouchableOpacity
              style={styles.whatsNextButton}
              onPress={() => {
                scrollViewRef.current?.scrollTo({
                  x: 0,
                  y: whatsNextYCoord,
                });
              }}
            >
              <Text style={[styles.textSm, styles.textCenter]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.shadowBox]}>
            <Text style={[styles.marginBottomMd, styles.textLg]}>
              Learning materials
            </Text>
            <TouchableOpacity
              style={[styles.listItem, styles.learning]}
              onPress={() =>
                Linking.openURL(
                  'https://nx.dev/getting-started/intro?utm_source=nx-project'
                )
              }
            >
              <Book width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={[styles.textMd]}>Documentation</Text>
                <Text style={[styles.text2XS, styles.textSubtle]}>
                  Everything is in there
                </Text>
              </View>
              <ChevronRight width={18} height={18} stroke="#000000"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.listItem, styles.learning]}
              onPress={() =>
                Linking.openURL('https://blog.nrwl.io/?utm_source=nx-project')
              }
            >
              <Blog width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={[styles.textMd]}>Blog</Text>
                <Text style={[styles.text2XS, styles.textSubtle]}>
                  Changelog, features & events
                </Text>
              </View>
              <ChevronRight width={18} height={18} stroke="#000000"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.listItem, styles.learning]}
              onPress={() =>
                Linking.openURL(
                  'https://www.youtube.com/c/Nrwl_io/videos?utm_source=nx-project'
                )
              }
            >
              <YouTube width={24} height={24} fill="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={[styles.textMd]}>Youtube channel</Text>
                <Text style={[styles.text2XS, styles.textSubtle]}>
                  Nx Show, talks & tutorials
                </Text>
              </View>
              <ChevronRight width={18} height={18} stroke="#000000"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.listItem, styles.learning]}
              onPress={() =>
                Linking.openURL(
                  'https://nx.dev/tutorial/01-create-application?utm_source=nx-project'
                )
              }
            >
              <Pointer width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={[styles.textMd]}>Interactive tutorials</Text>
                <Text style={[styles.text2XS, styles.textSubtle]}>
                  Create an app, step by step
                </Text>
              </View>
              <ChevronRight width={18} height={18} stroke="#000000"/>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.listItem, styles.learning]}
              onPress={() =>
                Linking.openURL(
                  'https://nxplaybook.com/?utm_source=nx-project'
                )
              }
            >
              <Courses width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={[styles.textMd]}>Video courses</Text>
                <Text style={[styles.text2XS, styles.textSubtle]}>
                  Nx custom courses
                </Text>
              </View>
              <ChevronRight width={18} height={18} stroke="#000000"/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console&utm_source=nx-project'
              )
            }
          >
            <View style={[styles.listItem, styles.shadowBox]}>
              <VSCode width={48} height={48} fill="rgba(0, 122, 204, 1)"/>
              <View style={styles.listItemTextContainer}>
                <Text
                  style={[
                    styles.textMd,
                    styles.textBold,
                    styles.marginBottomSm,
                  ]}
                >
                  Install Nx Console
                </Text>
                <Text style={[styles.textXS, styles.textLight]}>
                  Plugin for VSCode
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://nx.app/?utm_source=nx-project')
            }
          >
            <View style={styles.shadowBox}>
              <View style={[styles.listItem, styles.marginBottomMd]}>
                <NxCloud width={48} height={48}/>
                <View style={styles.listItemTextContainer}>
                  <Text
                    style={[
                      styles.textMd,
                      styles.textBold,
                      styles.marginBottomSm,
                    ]}
                  >
                    Nx Cloud
                  </Text>
                  <Text style={[styles.textXS, styles.textLight]}>
                    Enable faster CI & better DX
                  </Text>
                </View>
              </View>
              <View style={styles.codeBlock}>
                <Text style={[styles.monospace]}>nx connect-to-nx-cloud</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://nx.app/?utm_source=nx-project')
            }
          >
            <View style={[styles.listItem, styles.shadowBox]}>
              <GitHub width={48} height={48} fill="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text
                  style={[
                    styles.textMd,
                    styles.textBold,
                    styles.marginBottomSm,
                  ]}
                >
                  Nx is open source
                </Text>
                <Text style={[styles.textXS, styles.textLight]}>
                  Love Nx? Give us a star!
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={styles.section}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setWhatsNextYCoord(layout.y);
          }}
        >
          <View style={styles.shadowBox}>
            <Text style={[styles.textLg, styles.marginBottomMd]}>
              Next steps
            </Text>
            <Text
              style={[styles.textSm, styles.textLight, styles.marginBottomMd]}
            >
              Here are some things you can do with Nx:
            </Text>
            <View style={styles.listItem}>
              <Terminal width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.textSm}>Add UI library</Text>
              </View>
            </View>
            <View style={[styles.codeBlock, styles.marginBottomLg]}>
              <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                # Generate UI lib
              </Text>
              <Text
                style={[
                  styles.textXS,
                  styles.monospace,
                  styles.marginBottomMd,
                ]}
              >
                nx g @nrwl/react-native:lib ui
              </Text>
              <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                # Add a component
              </Text>
              <Text style={[styles.textXS, styles.monospace]}>nx g \</Text>
              <Text style={[styles.textXS, styles.monospace]}>
                @nrwl/react-native:component \
              </Text>
              <Text style={[styles.textXS, styles.monospace]}>
                button --project ui
              </Text>
            </View>
            <View style={styles.listItem}>
              <Terminal width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.textSm}>
                  View interactive project graph
                </Text>
              </View>
            </View>
            <View style={[styles.codeBlock, styles.marginBottomLg]}>
              <Text style={[styles.textXS, styles.monospace]}>nx graph</Text>
            </View>
            <View style={styles.listItem}>
              <Terminal width={24} height={24} stroke="#000000"/>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.textSm}>Run affected commands</Text>
              </View>
            </View>
            <View style={styles.codeBlock}>
              <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                # See what's affected by changes
              </Text>
              <Text
                style={[
                  styles.textXS,
                  styles.monospace,
                  styles.marginBottomMd,
                ]}
              >
                nx affected:graph
              </Text>
              <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                # run tests for current changes
              </Text>
              <Text
                style={[
                  styles.textXS,
                  styles.monospace,
                  styles.marginBottomMd,
                ]}
              >
                nx affected:text
              </Text>
              <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                # run e2e tests for current
              </Text>
              <Text style={[styles.textXS, styles.monospace, styles.comment]}>
                # changes
              </Text>
              <Text style={[styles.textXS, styles.monospace]}>
                nx affected:e2e
              </Text>
            </View>
          </View>
          <View style={[styles.listItem, styles.love]}>
            <Text style={styles.textSubtle}>Carefully crafted with </Text>
            <Heart width={24} height={24} fill="rgba(252, 165, 165, 1)"/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
