# caramelo
Caramelo App

BACKEND
-------------

Nodejs v9.0.0



FRONTEND
-------------

Ionic setup
-----------
npm install -g cordova ionic
ionic start myApp tabs
ionic start myApp blank
ionic start myApp sidemenu

Run your App
--------------          
cd myApp
ionic serve

Devapp
---------------
ionic serve -c

Build (prepare + compile) an Ionic project for a given platform
---------------

Synopsis
---------
ionic cordova build platform
  
Details
Like running cordova build directly, but also builds web assets and provides friendly checks.

To pass additional options to the Cordova CLI, use the -- separator after the Ionic CLI arguments. For example, for verbose log output from Cordova during an iOS build, one would use ionic cordova build ios -- -d. See additional examples below.

Input	Description
platform	The platform to build (android, ios)
Option	Description
--no-build	Do not invoke an Ionic build
--prod	Build the application for production
--aot	Perform ahead-of-time compilation for this build
--minifyjs	Minify JS for this build
--minifycss	Minify CSS for this build
--optimizejs	Perform JS optimizations for this build
--debug	Create a Cordova debug build
--release	Create a Cordova release build
--device	Create a Cordova build for a device
--emulator	Create a Cordova build for an emulator
--buildConfig	Use the specified Cordova build configuration
Examples
 ionic cordova build ios
 ionic cordova build ios --prod --release
 ionic cordova build ios --device --prod --release -- --developmentTeam="ABCD" --codeSignIdentity="iPhone Developer" --packageType="app-store"
 ionic cordova build android
 ionic cordova build android --prod --release -- -- --keystore=filename.keystore --alias=myalias
 ionic cordova build android --prod --release -- -- --minSdkVersion=21
 ionic cordova build android --prod --release -- -- --versionCode=55
 ionic cordova build android --prod --release -- -- --gradleArg=-PcdvBuildMultipleApks=true