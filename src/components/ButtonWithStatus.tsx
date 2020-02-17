import React, {ReactElement} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Text,
  ActivityIndicator,
  View,
  GestureResponderEvent,
} from 'react-native';
import PropTypes from 'prop-types';

const buttonWithStatusProps = {
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['default', 'loading', 'success']),
  onClick: PropTypes.any,
};

const buttonWithStatusDefaultProps = {
  title: 'Button',
  status: 'default',
  onClick: () => {},
};

type ButtonWithStatusProps = PropTypes.InferProps<typeof buttonWithStatusProps>;

const ButtonWithStatus: React.FC<ButtonWithStatusProps> = (
  props: ButtonWithStatusProps,
): ReactElement<ButtonWithStatusProps> => {
  const {title, status, onClick} = props;

  const squeezeInitValue = new Animated.Value(1);
  const arrowInitValue = new Animated.Value(4);
  const tickInitValue = new Animated.Value(16);

  const pressInHandler = () => {
    Animated.spring(squeezeInitValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  const pressOutHandler = () => {
    Animated.spring(squeezeInitValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const pressFocusHandler = () => {
    Animated.spring(arrowInitValue, {
      toValue: -15,
      speed: 5,
      bounciness: 5,
      useNativeDriver: true,
    }).start();
    Animated.spring(tickInitValue, {
      toValue: -5,
      speed: 5,
      useNativeDriver: true,
    }).start();
  };

  const pressFocusHandler2 = () => {
    Animated.spring(arrowInitValue, {
      toValue: 4,
      speed: 5,
      useNativeDriver: true,
    }).start();
    Animated.spring(tickInitValue, {
      toValue: 15,
      speed: 5,
      useNativeDriver: true,
    }).start();
  };

  // when button is pressed, squeeze the size of the button
  const squeezeStyle = {
    transform: [{scale: squeezeInitValue}],
  };

  // when button is focused, bring the tick up
  const arrowStyle = {
    transform: [
      {
        translateY: arrowInitValue,
      },
    ],
  };
  const tickStyle = {
    transform: [
      {
        translateY: tickInitValue,
      },
    ],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={(e: GestureResponderEvent) => {
        pressInHandler();
        pressFocusHandler();
        onClick(e);
      }}
      onPressOut={() => {
        pressOutHandler();
        pressFocusHandler2();
      }}>
      <Animated.View
        style={
          status === 'success'
            ? [styles.button, styles.buttonSuccess, squeezeStyle]
            : [styles.button, styles.buttonDefault, squeezeStyle]
        }>
        {(() => {
          if (status === 'default') {
            return (
              <View style={styles.icon}>
                <Animated.Text style={[styles.iconArrow, arrowStyle]}>
                  &#xea3a;
                </Animated.Text>
                <Animated.Text style={[styles.iconTick, tickStyle]}>
                  &#xea10;
                </Animated.Text>
              </View>
            );
          } else if (status === 'loading') {
            return <ActivityIndicator size="small" color="#fff" />;
          }

          return (
            <View style={styles.icon}>
              <Text style={styles.iconTickWhite}>&#xea10;</Text>
            </View>
          );
        })()}
        <Text style={styles.buttonTitle}>{title}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    width: 125,
    height: 48,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonDefault: {
    backgroundColor: '#5661ea',
  },
  buttonSuccess: {
    backgroundColor: '#66d46b',
  },
  buttonTitle: {
    marginLeft: 5,
    fontFamily: 'sans-serif',
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    width: 22,
    height: 22,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconArrow: {
    fontFamily: 'icomoon',
    fontSize: 10,
    color: '#5661ea',
  },
  iconTick: {
    fontFamily: 'icomoon',
    fontSize: 8,
    color: '#5661ea',
  },
  iconTickWhite: {
    fontFamily: 'icomoon',
    fontSize: 8,
    color: '#66d46b',
  },
});

ButtonWithStatus.propTypes = buttonWithStatusProps;
ButtonWithStatus.defaultProps = buttonWithStatusDefaultProps;

export default ButtonWithStatus;
