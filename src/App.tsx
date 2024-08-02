import React, {PropsWithChildren, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import CurrencyByCountry from './constants';

type CurrencyCardProp = PropsWithChildren<{
  handleCurrency: Function;
  currency: Currency;
  index: number;
  currentIndex: number;
}>

const CurrencyCard = ({currency, handleCurrency, index, currentIndex}: CurrencyCardProp): React.JSX.Element => {
  return (
    <Pressable
      onPress={() => {
        handleCurrency()
      }}
      style={[styles.card, index == currentIndex && styles.selectedCard]}
    >
      <Text
        style={[styles.darkColor, {fontWeight: 'bold', textAlign: 'center'}]}>
        {currency.name}
      </Text>
      <Text style={[styles.darkColor, {fontSize: 20}]}>{currency.flag}</Text>
    </Pressable>
  );
};

const App = (): React.JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [exchangeCurrencyValue, setExchangeCurrencyValue] = useState<string>(
    () => '',
  );
  const [currentCurrency, setCurrentCurrency] = useState<Currency | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.appContainer}>
      <View style={styles.inputContainer}>
        
        <View style={{margin: 'auto', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
        <TextInput
        style={styles.inputStyle}
          value={exchangeCurrencyValue}
          onChangeText={setExchangeCurrencyValue}
          placeholder={'(AF) Type amount'}
        />
        <Text style={[styles.selectedCurrency]}>🇦🇫</Text>
        </View>

        {currentCurrency && (
          <Text style={[styles.darkColor, styles.heading]}>
            <Text style={{color: '#2C74B3'}}>{currentCurrency.symbol}</Text>{' '}
            {parseFloat(
              '' + +exchangeCurrencyValue * +currentCurrency?.value,
            ).toFixed(2)}
          </Text>
        )}
      </View>
      <View style={styles.container}>
        {CurrencyByCountry.map((currency, index) => (
          <CurrencyCard
            key={index}
            currency={currency}
            index={index}
            currentIndex={currentIndex}
            handleCurrency={() => {
              setCurrentIndex(() => index);
              setCurrentCurrency(() => currency);
            }}            
            />
        ))}
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    paddingVertical: 50,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 30,
    justifyContent: 'center',
  },
  inputStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#baba',
    borderRightWidth: 0,
    width: '60%',
    color: '#000',
    borderRadius: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectedCurrency: {
    backgroundColor: 'white',
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10.4,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: '#baba',
    borderLeftWidth: 0
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedCard: {
    borderColor: '#F39F5A',
  },
  darkColor: {
    color: '#555',
  },
  inputContainer: {
    margin: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
