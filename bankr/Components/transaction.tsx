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
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

import Bank, { AccountModel } from '../Models/bank'
import { Guid } from 'guid-typescript';


interface TransactionProps {
    bank: Bank,
    selectedFrom: AccountModel | null,
    selectedTo: AccountModel | null,
    transaction: (from:Guid, to:Guid) => void
}

class Transaction extends React.Component<TransactionProps> {

    constructor(props: TransactionProps) {

        super(props);

        this.state = {
            transfer1: 0,
            transfer2: 2,
            transfer3: 0,
            transfer4: 0,
        };

    }

    render() {

        const transferMessage = "Choose Amount";

        return (
            <View>
                <View style={styles.pickerContainer}>

                    <Text style={styles.name}>{this.props.selectedFrom?.Name ?? 'Tap a player'}</Text>
                    <Text style={styles.name}>-></Text>
                    <Text style={styles.name}>{this.props.selectedTo?.Name ?? 'Tap a player'}</Text>

                    <Button title={transferMessage} disabled={this.props.selectedFrom == null || this.props.selectedTo == null} onPress={() => {
                        this.props.transaction(
                            this.props.selectedFrom!.Id,
                            this.props.selectedTo!.Id);
                    }}></Button>
                </View>

            </View>);
    }
};

const styles = StyleSheet.create({
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    name: {
        fontSize: 25
    }
});

export default Transaction;
