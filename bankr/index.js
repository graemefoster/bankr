/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import Bank from './Models/bank'

import {name as appName} from './app.json';

const bank = new Bank("Bank of Graeme!", ['Alice', 'Oliver', "Grandpa Peter", "Nanna Audrey", "Bindi", "Graeme", "Uncle Paul"]);
const WrappedApp = () => <App bank={bank} />;

AppRegistry.registerComponent(appName, () => WrappedApp);

