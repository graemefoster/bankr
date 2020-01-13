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
  View,
  Text,
  StatusBar,
  ScrollView,
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

interface BankProps {
  bank: Bank
}

import Bank, { TransactionModel, AccountModel } from './Models/bank'
import Account from './Components/account';
import Ledger from './Components/ledger';
import Transaction from './Components/transaction';
import { Guid } from 'guid-typescript';

declare var global: { HermesInternal: null | {} };

class App extends React.Component<BankProps, BankState> {

  constructor(props: BankProps) {
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
        account1: account
      })
    } else {
      this.setState({
        account2: account
      })
    }
    this.setState({ accountToggle: !this.state.accountToggle });
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Bankr - {this.props.bank.Name}</Text>
            <Button title={`Reset game - click ${5 - this.state.resetCount} times`} onPress={() => {
              this.setState({ resetCount: this.state.resetCount + 1 });
              if (this.state.resetCount == 4) {
                this.doSomethingToTheBank(() => this.props.bank.Restart());
              }
            }}></Button>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 10 }}>

            <View style={{ flex: 10, flexDirection: 'column', justifyContent: 'space-around' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: "wrap" }}>
                {this.props.bank.Accounts.map(x =>
                  <TouchableHighlight key={x.Id.toString()} onPress={() => this.accountTouched(x)}>
                    <Account account={x} />
                  </TouchableHighlight>
                )}
              </View>

              <View style={{}}>
                <Transaction bank={this.props.bank} selectedFrom={this.state.account1} selectedTo={this.state.account2} transaction={(from, to, amount) => {
                  this.doSomethingToTheBank(() => {
                    this.props.bank.Transfer(
                      from,
                      to,
                      amount,
                      (from, to) => `Transfer from ${from?.Name} to ${to.Name}`)
                  });
                  this.setState({account1: null, account2: null, accountToggle: true});
                }} />
              </View>

            </View>

            <View style={{ flex: 5 }}>
              <Ledger ledger={this.props.bank.Ledger()} />
            </View>

          </View>

        </SafeAreaView>
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

export default App;
