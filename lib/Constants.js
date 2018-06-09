// @flow

import {
  Dimensions,
  Platform,
} from 'react-native'; // eslint-disable-line

export const ANIMATION_DURATION = 300;

const { height, width } = Dimensions.get('window');
export const MAX_SCREEN_SIZE = height > width ? height : width;

export const TRANSPARENT_COLOR = 'transparent';

export const OPACITY = Platform.select({
  android: 0.4,
  ios: 0.4,
});

export const backdropAnimationTypes = {
  FADE: 'fade',
  NONE: 'none',
};

export const keyboardAnimationTypes = {
  FADE: 'fade',
  SLIDE: 'slide',
  NONE: 'none',
};

export const layoytAnimationTypes = {
  SPRING: 'spring',
  LINEAR: 'linear',
  EASE_IN_EASE_OUT: 'easeInEaseOut',
  EASE_IN: 'easeIn',
  EASE_OUT: 'easeOut',
  KEYBOARD: 'keyboard',
};
