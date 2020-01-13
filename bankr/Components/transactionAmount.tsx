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

import { NavigationStackProp } from 'react-navigation-stack';

type Props = {
    navigation: NavigationStackProp<{}>
}

type TransactionState = {
    transfer1: number,
    transfer2: number,
    transfer3: number,
    transfer4: number,
}


class Transaction extends React.Component<Props, TransactionState> {

    constructor(props: Props) {

        super(props);
        this.state = {
            transfer1: 0,
            transfer2: 2,
            transfer3: 0,
            transfer4: 0
        };

    }

    render() {

        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        function genPicker(getState: number, setState: (x: number) => void) {
            return (<Picker itemStyle={styles.numberPicker}
                selectedValue={getState}
                onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
                {numbers.map(x => (
                    <Picker.Item key={x.toString()} label={x.toString()} value={x} />)
                )}
            </Picker>);
        }

        return (
            <View style={styles.amountContainer}>
                <View style={styles.pickerContainer}>

                    {genPicker(this.state.transfer1, (x: number) => this.setState({ transfer1: x }))}
                    {genPicker(this.state.transfer2, (x: number) => this.setState({ transfer2: x }))}
                    {genPicker(this.state.transfer3, (x: number) => this.setState({ transfer3: x }))}
                    {genPicker(this.state.transfer4, (x: number) => this.setState({ transfer4: x }))}

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button title={"Cancel"} onPress={() => this.props.navigation.pop()}></Button>
                    <Button title={"Transfer"} onPress={() => {
                        const amount = (this.state.transfer1 * 1000) + (this.state.transfer2 * 100) + (this.state.transfer3 * 10) + this.state.transfer4;
                        (this.props.navigation.getParam('ok') as (amount: number) => void)(amount);
                    }}></Button>
                </View>

            </View>);
    }
};

const styles = StyleSheet.create(
    {
        amountContainer: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center"
        },
        pickerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center'
        },
        picker: {
            width: 200
        },
        numberPicker: {
            width: 75,
            fontSize: 25
        }
    });

export default Transaction;
