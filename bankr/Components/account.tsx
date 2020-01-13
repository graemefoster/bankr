/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { AccountModel } from '../Models/bank'

interface AccountProps {
    account: AccountModel
}

const Account = ({ account }: AccountProps) => {
    return (
        <View style={styles.body}>
            <Text style={styles.sectionDescription}>{account.Name}</Text>
            <Text style={account.Balance >= 0 ? styles.balance : styles.balanceNegative}>${account.Balance}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'lightgreen',
        width: 150,
        padding: 5,
        margin: 10,
        alignItems: 'flex-start'
    },
    sectionDescription: {
        height: 50,
        fontSize: 18,
        fontWeight: '800',
        color: Colors.dark,
    },
    balance: {
        fontSize: 20,
        color: 'green'
    },
    balanceNegative: {
        fontSize: 20,
        color: 'red'
    }
});

export default Account;
