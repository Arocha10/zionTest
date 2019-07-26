the-list-app

Android Studio
Install Android Studio, as well as react-native-debugger.

Initial setup for Android Studio:

Don't import settings
Do custom install & add latest SDK
From the Welcome Screen, go to Configure -> SDK Manager
Install other SDKs (Android 7.0+)
From Welcome Screen, choose "Open an existing Android Studio project"
Import an existing project: open the android/ directory.
Let Gradle automatically sync
it will probably fail several times, just keep clicking the blue links to install any missing dependencies
To start developing:

CD into the project's root and run yarn to install node dependencies
Open AVD Manager and run a device emulator
After a "cold boot", use yarn android:run to get the app loaded onto the phone
run yarn start to start the dev server
hit "R+R" to reload any changes
run yarn android:shake to connect to the react-native-debugger

XCode
Download and install Xcode from App Store
From Welcome Screen, choose "Open another project"
Import an existing project: open the ios/ directory and open the .xcworkspace file.
To start developing:

CD into the project's root and run yarn to install node dependencies
Cd into ios/ and run pod install (You need to have Cocoapods installed)
From Xcode select a simulator and press build button

Improvement : 
  If the connection have too much delay, the app looks like isnt doing anything. I would add a ActivityIndicator from the `react-native` library to notify the user that is working o nthe request. 

Personal decision: 
  I consider that a app mobile hadn't use a footer like a web application, so inside the SideMenu I added a space for social and credits
  
  

