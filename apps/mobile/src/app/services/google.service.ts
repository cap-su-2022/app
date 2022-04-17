import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

GoogleSignin.configure({
  iosClientId: '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com',
  webClientId: '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com',
  offlineAccess: false
});

export const handleGoogleSignin = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // <-- Add this
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};
