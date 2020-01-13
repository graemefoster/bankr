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
    Picker,
    Button
} from 'react-native';

import Bank, { AccountModel } from '../Models/bank'
import { Guid } from 'guid-typescript';

interface TransactionState {
    transfer1: number,
    transfer2: number,
    transfer3: number,
    transfer4: number,
}


interface TransactionProps {
    bank: Bank,
    selectedFrom: AccountModel | null,
    selectedTo: AccountModel | null,
    transaction: (from:Guid, to:Guid, amount:number) => void
}

class Transaction extends React.Component<TransactionProps, TransactionState> {

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

        const transferMessage = "Transfer $" + ((this.state.transfer1 * 1000) + (this.state.transfer2 * 100) + (this.state.transfer3 * 10) + this.state.transfer4);

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        function genPicker(getState: number, setState: (x: number) => void) {
            return (<Picker style={styles.numberPicker}
                selectedValue={getState}
                onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
                {numbers.map(x => (
                    <Picker.Item key={x.toString()} label={x.toString()} value={x} />)
                )}
            </Picker>);
        }

        return (
            <View>
                <View style={styles.pickerContainer}>

                    {genPicker(this.state.transfer1, (x: number) => this.setState({ transfer1: x }))}
                    {genPicker(this.state.transfer2, (x: number) => this.setState({ transfer2: x }))}
                    {genPicker(this.state.transfer3, (x: number) => this.setState({ transfer3: x }))}
                    {genPicker(this.state.transfer4, (x: number) => this.setState({ transfer4: x }))}

                    <Text>{this.props.selectedFrom?.Name ?? 'Tap a player'}</Text>
                    <Text>-></Text>
                    <Text>{this.props.selectedTo?.Name ?? 'Tap a player'}</Text>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button title={transferMessage} disabled={this.props.selectedFrom == null || this.props.selectedTo == null} onPress={() => {
                        this.props.transaction(
                            this.props.selectedFrom!.Id,
                            this.props.selectedTo!.Id,
                            (this.state.transfer1 * 1000) + (this.state.transfer2 * 100) + (this.state.transfer3 * 10) + this.state.transfer4);
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
    picker: {
        width: 200,
    },
    numberPicker: {
        width: 75,
    }
});

export default Transaction;
