import React from 'react'
import { Button } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack';
import BankModel from '../Models/bank';

type Props = {
    navigation: NavigationStackProp<{ }>;
};

class Home extends React.Component<Props> {
    static navigationOptions = {
        title: 'Welcome to the Bank!',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <Button
                title="Start the bank!"
                onPress={() => navigate('Bank', {bank: new BankModel("Bank of Graeme!", ['Alice', 'Oliver', "Grandpa Peter", "Nanna Audrey", "Bindi", "Graeme", "Uncle Paul"])})}
            />
        );
    }
}

export default Home;
