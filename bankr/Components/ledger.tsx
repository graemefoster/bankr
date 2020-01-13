/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

import { TransactionModel } from '../Models/bank'

interface LedgerProps {
    ledger: TransactionModel[]
}

class Ledger extends Component<LedgerProps> {

    constructor(props: LedgerProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.body}>
                <FlatList
                    data={this.props.ledger}
                    keyExtractor={item => item.Id.toString() }
                    renderItem={({ item }) => 
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.balance}>${item.Amount.toString()}</Text>
                            <Text>{item.Narrative}</Text>
                        </View>} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
        padding: 15
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '800',
        color: Colors.dark,
    },
    balance: {
        fontSize: 20,
        width:100,
        color: 'green'
    },
    balanceNegative: {
        fontSize: 20,
        color: 'red'
    }
});

export default Ledger;
