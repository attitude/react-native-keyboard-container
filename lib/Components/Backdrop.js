// @flow

import * as React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types'; // eslint-disable-line
import {
  type StyleProp,
  Animated,
  TouchableWithoutFeedback,
  View,
} from 'react-native'; // eslint-disable-line

import { styles } from './Styles/BackdropStyles';

import {
  ANIMATION_DURATION,
  OPACITY,
  TRANSPARENT_COLOR,
  backdropAnimationTypes,
} from '../Constants';

export type PublicProps = {
  animationDuration?: number,
  animationType?: $Values<typeof backdropAnimationTypes>,
  color?: string,
  onPress?: () => void,
  opacity?: number,
  style?: StyleProp,
}

type Props = PublicProps & {
  animatedValue: Animated.Value,
  onPress: () => void,
  visible?: boolean,
}

export class Backdrop extends React.Component<Props> {
  static backdropAnimationTypes = backdropAnimationTypes

  static propTypes = {
    animatedValue: PropTypes.shape({
      interpolate: PropTypes.func.isRequired,
    }),
    animationDuration: PropTypes.number,
    animationType: PropTypes.oneOf(Object.values(backdropAnimationTypes)),
    color: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    opacity: PropTypes.number,
    style: View.propTypes.style,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    animatedValue: null,
    animationDuration: ANIMATION_DURATION,
    animationType: backdropAnimationTypes.NONE,
    color: 'black',
    opacity: OPACITY,
    style: null,
    visible: false,
  }

  render() {
    const {
      animatedValue,
      animationType,
      color,
      onPress,
      opacity,
      style,
    } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={onPress}
      >
        <Animated.View
          style={[
            {
              backgroundColor: color,
              opacity: animationType === backdropAnimationTypes.FADE && color !== TRANSPARENT_COLOR
                ? animatedValue
                  ? animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, opacity],
                  })
                  : null
                : OPACITY,
            },
            styles.backdrop,
            style,
          ]}
        />
      </TouchableWithoutFeedback>
    );
  }
}
