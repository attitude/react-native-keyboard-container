/**
 * @Author: Martin Adamko <attitude>
 * @flow
 */

import * as React from 'react'; // eslint-disable-line
import PropTypes from 'prop-types'; // eslint-disable-line
import {
  type KeyboardEvent,
  type StyleProp,
  type ViewLayout,
  type ViewLayoutEvent,
  Animated,
  Modal,
  NativeEventEmitter,
  NativeModules,
  Platform,
  View,
} from 'react-native'; // eslint-disable-line

import {
  ANIMATION_DURATION,
  MAX_SCREEN_SIZE,
  backdropAnimationTypes,
  keyboardAnimationTypes,
  layoytAnimationTypes,
} from '../Constants';

import {
  type PublicProps as BackdropProps,
  Backdrop,
} from './Backdrop';
import { styles } from './Styles/KeyboardContainerStyles';

const { KeyboardObserver } = NativeModules;
const Keyboard = new NativeEventEmitter(KeyboardObserver);

const showListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillChangeFrame';
const hideListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillChangeFrame';
const showListenerExtra = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
const hideListenerExtra = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

// TODO: implement `keyboardWillChangeFrame` and `keyboardDidChangeFrame` and `dismiss()```

const keyboardShowEvent = ({
  animationDuration,
  layout,
}: {
  animationDuration: number,
  layout: ViewLayout,
}): KeyboardEvent => ({
  duration: animationDuration,
  easing: layoytAnimationTypes.KEYBOARD,
  endCoordinates: {
    screenX: layout.x,
    screenY: layout.y,
    height: layout.height,
    width: layout.width,
  },
});

// TODO: Fix return type since endCoordinates is not needed to tigger keyboard hidden
const keyboardHideEvent = ({ animationDuration }: {animationDuration: number}): KeyboardEvent => ({
  duration: animationDuration,
  easing: layoytAnimationTypes.KEYBOARD,
});

const supportedOrientationsList = {
  PORTRAIT: 'portrait',
  PORTRAIT_UPSIDE_DOWN: 'portrait-upside-down',
  LANDSCAPE: 'landscape',
  LANDSCAPE_LEFT: 'landscape-left',
  LANDSCAPE_RIGHT: 'landscape-right',
};

type Props = {
  animationDuration: number,
  animationType?: $Values<typeof keyboardAnimationTypes>,
  backdropProps: BackdropProps,
  children?: React.Node,
  hardwareAccelerated?: boolean,
  onDismiss?: () => void,
  onOrientationChange?: () => void,
  onShow?: () => void,
  onRequestClose: () => void,
  style?: StyleProp,
  supportedOrientations?: $Values<typeof supportedOrientationsList>[],
  transparent?: boolean,
  useExtraListeners?: boolean,
  visible?: boolean,
}

type State = {
  layout: ?ViewLayout,
  visible: boolean,
}

export class KeyboardContainer extends React.Component<Props, State> {
  static backdropAnimationTypes = backdropAnimationTypes;
  static keyboardAnimationTypes = keyboardAnimationTypes;
  static supportedOrientations = supportedOrientationsList;

  static propTypes = {
    animationDuration: PropTypes.number,
    animationType: PropTypes.oneOf(Object.values(keyboardAnimationTypes)),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    hardwareAccelerated: PropTypes.bool,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    onOrientationChange: PropTypes.func,
    onRequestClose: PropTypes.func.isRequired,
    style: View.propTypes.style,
    supportedOrientations: PropTypes.arrayOf(PropTypes.oneOf(Object.values(supportedOrientationsList))), // eslint-disable-line max-len
    transparent: PropTypes.bool,
    useExtraListeners: PropTypes.bool,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    animationDuration: ANIMATION_DURATION,
    animationType: keyboardAnimationTypes.SLIDE,
    children: null,
    hardwareAccelerated: false,
    onDismiss: undefined,
    onShow: undefined,
    onOrientationChange: undefined,
    style: undefined,
    supportedOrientations: undefined,
    transparent: true,
    useExtraListeners: false,
    visible: true,
  }

  constructor(props: Props) {
    super(props);

    this._animatedValue = props.animationType === keyboardAnimationTypes.NONE
      ? new Animated.Value(1)
      : new Animated.Value(0);

    this.state = {
      layout: null,
      visible: !props.visible,
    };
  }

  componentDidMount() {
    this._animate(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visible !== this.state.visible) {
      this._animate(nextProps);
    }
  }

  _animatedValue: ?Animated.Value = null

  _animate(props: Props) {
    if (props.visible) {
      this._show(props);
    } else {
      this._hide(props);
    }
  }

  _hide({ animationDuration }: Props) {
    const { layout, visible } = this.state;

    if (layout && visible) {
      Keyboard.emit(
        this.props.useExtraListeners ? hideListenerExtra : hideListener,
        keyboardHideEvent({
          animationDuration,
        }),
      );

      this._animatedValue && Animated.timing(
        this._animatedValue,
        {
          toValue: 0,
          duration: animationDuration,
        },
      ).start(() => {
        this.setState({ visible: false });
      });
    }
  }

  _show({ animationDuration }: Props) {
    const { layout, visible } = this.state;

    if (layout && !visible) {
      this.setState({ visible: true }, () => {
        Keyboard.emit(
          this.props.useExtraListeners ? showListenerExtra : showListener,
          keyboardShowEvent({
            animationDuration,
            layout,
          }),
        );

        this._animatedValue && Animated.timing(
          this._animatedValue,
          {
            toValue: 1,
            duration: animationDuration,
          },
        ).start();
      });
    }
  }

  _onRequestClose = () => {
    this._hide(this.props);
    this.props.onRequestClose();
  }

  _onBackdropPress = () => {
    const { onPress } = this.props.backdropProps;
    onPress && onPress();

    this._hide(this.props);
  }

  _updateLayout = ({ nativeEvent: { layout } }: ViewLayoutEvent) => {
    this.setState({ layout });
  }

  render() {
    const {
      layout,
      visible,
    } = this.state;

    const {
      animationType,
      backdropProps,
      children,
      hardwareAccelerated,
      onDismiss,
      onShow,
      style,
      supportedOrientations,
      transparent,
    } = this.props;

    const animationStyle = !this._animatedValue
      ? null
      : animationType === keyboardAnimationTypes.SLIDE
        ? {
          transform: [{
            translateY: this._animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [(layout && layout.height) || MAX_SCREEN_SIZE, 0],
            }),
          }],
        }
        : animationType === keyboardAnimationTypes.FADE
          ? { opacity: this._animatedValue }
          : null;

    return (
      <Modal
        animationType='none'
        onDismis={onDismiss}
        onRequestClose={this._onRequestClose}
        {...(onDismiss ? { onDismiss } : undefined)}
        {...(onShow ? { onShow } : undefined)}
        {...(supportedOrientations ? { supportedOrientations } : undefined)}
        visible={visible}
        hardwareAccelerated={hardwareAccelerated}
        transparent={transparent}
      >
        <Backdrop
          {...{
            animationDuration: backdropProps.animationDuration,
            animationType: backdropProps.animationType,
            color: backdropProps.color,
            opacity: backdropProps.opacity,
            style: backdropProps.style,
          }}
          animatedValue={this._animatedValue}
          visible={visible}
          onPress={this._onBackdropPress}
        />
        <Animated.View
          onLayout={this._updateLayout}
          style={[
            styles.container,
            animationStyle,
            style,
          ]}
        >
          {children}
        </Animated.View>
      </Modal>
    );
  }
}
