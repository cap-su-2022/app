import {GoogleSignin} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  iosClientId: '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com',
  webClientId: '1013204251190-74m7mtno9e3ge4fdie3422hotor5217c.apps.googleusercontent.com',
  offlineAccess: false
});

const handleAPIPostRequestCall = async (url: string, body: object, mediaType = "application/json", accessToken: string = null) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': mediaType,
      'Authorization': accessToken,
    },
    method: 'POST',
    body: JSON.stringify(body),
  });

  let data = null;
  if (mediaType === 'application/json') {
    data = await response.json();
  } else if (mediaType === 'text/plain') {
    data = await response.text();
  } else if (mediaType === 'multipart/form-data') {
    data = await response.blob();
  }
  return data;
};

export const handleGoogleSignin = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true}); // <-- Add this
  const {idToken} = await GoogleSignin.signIn();
  const response = await handleAPIPostRequestCall(`http://172.16.4.119:5000/api/v1/auth/signin/google`, {token: idToken});
  return response;

};
