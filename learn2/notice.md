http://stackoverflow.com/questions/41263123/selecting-time-in-prompt-alert-ionic-2
modalControl
Programming Languages and Lambda Calculi

https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp
 ξ
然后用brew装openssl再设置下
 ξ
再装个.net core sdk 1.1
 ξ
https://www.microsoft.com/net/core#macos

font awesome
http://stackoverflow.com/questions/39122669/using-font-awesome-in-ionic-2

https://github.com/apache/cordova-plugin-statusbar

keytool -genkey -v -keystore inkow-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore inkow-release-key.keystore /Users/xudonghao/Desktop/temp-app/test-app/platforms/android/build/outputs/apk/android-release-unsigned.apk alias_name

/Users/xudonghao/Library/Android/sdk/build-tools/25.0.2/zipalign -v 4 /Users/xudonghao/Desktop/temp-app/test-app/platforms/android/build/outputs/apk/android-release-unsigned.apk release.apk

/Users/xudonghao/Desktop/temp-app/test-app/platforms/android/build/outputs/apk/android-release-unsigned.apk

/Users/xudonghao/Library/Android/sdk/build-tools/25.0.2/zipalign -v 4 /Users/xudonghao/Desktop/app/testApp/platforms/android/build/outputs/apk/android-release-unsigned.apk

http://ionicframework.com/docs/v1/guide/publishing.html

https://medium.com/react-weekly/react-native-and-typescript-ad57b7413ead

https://ferugi.com/blog/nodejs-on-godaddy-shared-cpanel/

http://www.nearform.com/nodecrunch/nodejs-sudo-free/

http://stackoverflow.com/questions/564650/convert-html-to-pdf-in-net

https://angular-maps.com/docs/api/latest/ts/core/index/SebmGoogleMap-directive.html

http://blog.ionic.io/automating-icons-and-splash-screens/

http://stackoverflow.com/questions/32514772/jquery-mobile-with-cordova-header-overlapping-with-ios-status-bar

ionic angular 2 animation
https://forum.ionicframework.com/t/list-item-remove-animation/51857/7

web animation api for ios
http://stackoverflow.com/questions/42393324/ionic-2-animations-not-working-on-ios-device

full calendar
https://fullcalendar.io/

"https:\/\/iknowapi.divinepassport.com\/1\/2",

http://192.168.1.39:8888/1/3"

ionic2 calendar
https://twinssbc.github.io/Ionic2-Calendar/


iknow.ios.v.2.develope

https://github.com/twinssbc/Ionic2-Calendar

swipe tabs
https://github.com/newsof1111/ionic2-swipedTab-OpenProject


react native with typescript
https://medium.com/@rintoj/react-native-with-typescript-40355a90a5d7

cordova back audio
https://stackoverflow.com/questions/29145888/cordova-ios-how-to-play-audio-file-when-app-is-running-in-background


First,DO those things that I wrote in this question. Then import AVFoundation into your AppDelegate.m #import <AVFoundation/AVFoundation.h>

Then add the following to application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions

AVAudioSession *audioSession = [AVAudioSession sharedInstance];
BOOL ok;
NSError *setCategoryError = nil;
ok = [audioSession setCategory:AVAudioSessionCategoryPlayback error:&setCategoryError];