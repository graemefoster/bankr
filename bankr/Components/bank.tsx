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
    Button,
    TouchableHighlight,
} from 'react-native';

import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';

interface BankState {
    resetCount: number,
    account1: AccountModel | null,
    account2: AccountModel | null,
    accountToggle: boolean
}

type Props = {
    navigation: NavigationStackProp<{}>
}

import BankModel, { AccountModel } from '../Models/bank'
import Account from './account';
import Ledger from './ledger';
import Transaction from './transaction';
import { NavigationStackProp } from 'react-navigation-stack';
import { Guid } from 'guid-typescript';

declare var global: { HermesInternal: null | {} };

class Bank extends React.Component<Props, BankState> {

    constructor(props: Props) {
        super(props);
        this.state = { resetCount: 0, accountToggle: true, account1: null, account2: null }
    }

    doSomethingToTheBank(action: () => void) {
        action();
        this.forceUpdate();
        this.setState({ resetCount: 0 });
    }

    accountTouched(account: AccountModel) {
        if (this.state.accountToggle) {
            this.setState({
                account1: account,
                account2: null
            })
        } else {
            this.setState({
                account2: account
            })
        }
        this.setState({ accountToggle: !this.state.accountToggle });
    }

    beginTransferFlow(bank: BankModel, from: Guid, to: Guid) {
        this.props.navigation.push("Transaction", {
            ok: (amount: number) => this.doSomethingToTheBank(() => {
                this.props.navigation.pop();
                bank.Transfer(from, to, amount, (from, to) => `Transfer from ${from?.Name} to ${to.Name}`)
                this.setState({ account1: null, account2: null, accountToggle: true });
            })
        });
    }

    render() {

        const bank = this.props.navigation.getParam('bank') as BankModel;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Bankr - {bank.Name}</Text>
                    <Button title={`Reset game - click ${5 - this.state.resetCount} times`} onPress={() => {
                        this.setState({ resetCount: this.state.resetCount + 1 });
                        if (this.state.resetCount == 4) {
                            this.props.navigation.pop();
                        }
                    }}></Button>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 10 }}>

                    <View style={{ flex: 10, flexDirection: 'column', justifyContent: 'space-around' }}>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: "wrap" }}>
                            {bank.Accounts.map(x =>
                                <TouchableHighlight key={x.Id.toString()} onPress={() => this.accountTouched(x)}>
                                    <Account account={x} />
                                </TouchableHighlight>
                            )}
                        </View>

                        <View style={{}}>
                            <Transaction bank={bank} selectedFrom={this.state.account1} selectedTo={this.state.account2} transaction={(from, to) => {
                                this.beginTransferFlow(bank, from, to);
                            }} />
                        </View>

                    </View>

                    <View style={{ flex: 5 }}>
                        <Ledger ledger={bank.Ledger()} />
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    sectionContainer: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
        textAlign: 'center'
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
});

export default Bank;
