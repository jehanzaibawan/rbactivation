/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {ReactElement, useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Image} from 'react-native';
import ButtonWithStatus from '../components/ButtonWithStatus';
import {activate} from '../APIs/rakbank';

const WelcomeScreen = (): ReactElement => {
  const [buttonStatus, setButtonStatus] = useState({
    status: 'default',
    title: 'Activate',
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SafeAreaView>
        <View style={styles.imgWrapper}>
          <Image
            style={styles.image}
            source={require('../assets/images/rakbank_logo.png')}
          />
        </View>
        <View style={styles.btnWrapper}>
          <ButtonWithStatus
            title={buttonStatus.title}
            status={buttonStatus.status}
            onClick={async () => {
              setButtonStatus({status: 'loading', title: 'Waiting'});
              const response = await activate();

              if (response) {
                if (response.status === 200) {
                  setButtonStatus({status: 'success', title: 'Activated'});
                } else {
                  // TODO: do better error handling
                  setButtonStatus({status: 'default', title: 'Activate'});
                }
              } else {
                // TODO: do better error handling
                setButtonStatus({status: 'default', title: 'Activate'});
              }
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgWrapper: {
    flex: 1,
    marginTop: 200,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
  },
  btnWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 200,
  },
});

export default WelcomeScreen;
