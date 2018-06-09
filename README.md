# react-native-keyboard-container

A container for custom keyboard.

TODO:

- Publish to NPM
- Implement `keybaordAwareChangeAnimation` prop

### Motivation

There is no default Picker/Select keyboard for the iOS, nor Android. There is
however implementation of Picker for iOS, but missing for the Android.

If you ever tried to implement picker using the Modal, you might miss the
ability to use keyboard avoiding views like the [react-native-keyboard-spacer](https://github.com/Andr3wHur5t/react-native-keyboard-spacer) or [official KeyboardAvoidingView](https://facebook.github.io/react-native/docs/keyboardavoidingview.html).

## Props

- [`animationDuration`](#animationDuration)
- [`animationType`](#animationType)
- [`backdropProps`](#backdropProps)
- [`children`](#children)
- [`hardwareAccelerated`](#hardwareAccelerated)
- [`onDismiss`](#onDismiss)
- [`onOrientationChange`](#onOrientationChange)
- [`onShow`](#onShow)
- [`onRequestClose`](#onRequestClose)
- [`style`](#style)
- [`supportedOrientations`](#supportedOrientations)
- [`transparent`](#transparent)
- [`useExtraListeners`](#useExtraListeners)
- [`visible`](#visible)

## [animationDuration](#animationDuration)

**The `animationDuration` prop controls length of animation (milliseconds)**

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
number | 300   | No

## [animationType](#animationType)

**The `animationType` prop controls how the keyboard animates.**

+ `slide` slides in from the bottom
+ `fade` fades into view
+ `none` appears without an animation

Use `static KeyboardContainer.animationTypes` constants.

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
enum('fade', 'slide', 'none') | `'slide'` | No

### NOT YET IMPLEMENTED: keybaordAwareChangeAnimation

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
enum('spring', 'linear', 'easeInEaseOut', 'easeIn', 'easeOut', 'keyboard') | `'keyboard'` | No
  

## [backdropProps](#backdropProps)

**The `animationDuration` prop controls the length of backdrop animation (milliseconds)**

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
number | 300   | No

**animationType**: Animation type for the backdrop

The `animationType` prop controls how the backdrop animates.

+ `fade` fades into view
+ `none` appears without an animation

Use `static KeyboardAware.backdropAnimationTypes` constants.

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
enum('fade', 'none') | `'fade'` | No

**color**: backdrop color

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
string | `'black'` | No

**onPress**: callback to be called when user touches the backdrop

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
function | No | No


**opacity** - Opacity of the backdrop

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
number [0-1] | `0.4` | No

**style**: Style to be applied on the backdrop

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
[view styles](https://facebook.github.io/react-native/docs/view-style-props.html) | No | No

## [children](#children)

TYPE | DEFAULT | REQUIRED
:----|--------:|--------:
React.Node | No | No

## [hardwareAccelerated](#hardwareAccelerated)

The `hardwareAccelerated` prop controls whether to force hardware acceleration for the underlying window.

TYPE | DEFAULT | REQUIRED | PLATFORM
:----|--------:|---------:|--------:
boolean | No | No | Android

## [onDismiss](#onDismiss)

The onDismiss prop allows passing a function that will be called once the modal has been dismissed.

TYPE | DEFAULT | REQUIRED | PLATFORM
:----|--------:|---------:|--------:
function | No | No | iOS

## [onOrientationChange](#onOrientationChange)

The `onOrientationChange` callback is called when the orientation changes while the modal is being displayed. The orientation provided is only 'portrait' or 'landscape'. This callback is also called on initial render, regardless of the current orientation.

TYPE | DEFAULT | REQUIRED | PLATFORM
:----|--------:|---------:|--------:
function | No | No | iOS

## [onShow](#onShow)

The `onShow` prop allows passing a function that will be called once the modal has been shown.

TYPE | DEFAULT | REQUIRED
:----|--------:|---------
function | No | No


## [onRequestClose](#onRequestClose)

The `onRequestClose` callback is called when the user taps the hardware back button on Android or the menu button on Apple TV. Because of this required prop, be aware that BackHandler events will not be emitted as long as the modal is open.

TYPE | DEFAULT | REQUIRED
:----|--------:|---------
function | No | Yes

## [style](#style)

?: StyleProp,

## [supportedOrientations](#supportedOrientations)

The `supportedOrientations` prop allows the modal to be rotated to any of the specified orientations. On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field. When using presentationStyle of pageSheet or formSheet, this property will be ignored by iOS.

TYPE | DEFAULT | REQUIRED | PLATFORM
:----|--------:|---------:|--------:
array of enum('portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right')	| No | No | iOS

## [transparent](#transparent)

The `transparent` prop determines whether the modal holding the keyboard will fill the entire view. Setting this to true will render the modal over a transparent background.

TYPE | DEFAULT | REQUIRED
:----|--------:|---------
boolean | `true` | No

## [useExtraListeners](#useExtraListeners)

Use `useExtraListeners` prop to use with `react-native-keyboard-spacer` package.

TYPE | DEFAULT | REQUIRED
:----|--------:|---------
boolean | `false` | No

## [visible](#visible)

The `visible` prop determines whether your keyboard is visible.

TYPE | DEFAULT | REQUIRED
:----|--------:|---------
boolean | `true` | No
