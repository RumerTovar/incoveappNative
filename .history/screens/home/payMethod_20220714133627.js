import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import StepIndicatorComponent from '../../components/homeScreen/stepIndicatorComponent/stepIndicatorComponent';
import { globalStyles } from '../../styles/global';
import NumberFormat from 'react-number-format';
import { RadioButton } from 'react-native-paper';
import { useState } from 'react';

export default function PayMethod({ navigation }) {
 const [checked, setChecked] = useState('first');

 const step = 1;
 return (
  <>
   <View style={styles.container}>
    <View style={styles.stepContainer}>
     <StepIndicatorComponent step={step} />
    </View>
    <View style={styles.cuotasContainer}>
     <View style={styles.radioButtonGroup}>
      <Text
       style={{
        color: globalStyles.palette.primary[20],
       }}>
       12 cuotas
      </Text>
      <RadioButton
       uncheckedColor={globalStyles.palette.primary[20]}
       color={globalStyles.palette.primary[100]}
       value='first'
       status={checked === 'first' ? 'checked' : 'unchecked'}
       onPress={() => setChecked('first')}
      />
     </View>
     <View style={styles.radioButtonGroup}>
      <Text>24 cuotas</Text>

      <RadioButton
       uncheckedColor={globalStyles.palette.primary[20]}
       color={globalStyles.palette.primary[100]}
       value='second'
       status={checked === 'second' ? 'checked' : 'unchecked'}
       onPress={() => setChecked('second')}
      />
     </View>
     <View style={styles.radioButtonGroup}>
      <Text>36 cuotas</Text>

      <RadioButton
       uncheckedColor={globalStyles.palette.primary[20]}
       color={globalStyles.palette.primary[100]}
       value='third'
       status={checked === 'third' ? 'checked' : 'unchecked'}
       onPress={() => setChecked('third')}
      />
     </View>
    </View>

    <View style={styles.buttonContainer}>
     <Pressable
      android_ripple={{ color: '#fff' }}
      style={styles.buttonCash}
      onPress={() => navigation.navigate('saleSummary')}>
      <Text style={styles.textButtonCash}>Efectivo</Text>
     </Pressable>
     <Pressable
      android_ripple={{ color: '#fff' }}
      style={styles.buttonCard}
      onPress={() => navigation.navigate('saleSummary')}>
      <Text style={styles.textButtonCard}>Tarjeta</Text>
     </Pressable>
    </View>
   </View>
   <View style={styles.totalContainer}>
    <Text style={globalStyles.typography.regular[4]}>Total</Text>
    <NumberFormat
     value={2255000.99}
     displayType='text'
     thousandSeparator='.'
     decimalSeparator=','
     prefix='$'
     renderText={(value) => (
      <Text style={globalStyles.typography.semiBold[4]}>{value}</Text>
     )}
    />
   </View>
  </>
 );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: 'white',
  paddingHorizontal: 24,
 },
 stepContainer: {
  paddingVertical: 16,
 },
 cuotasContainer: {
  marginTop: 26,
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
 },
 radioButtonGroup: {
  alignItems: 'center',
  flexDirection: 'column-reverse',
 },
 buttonContainer: {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: 16,
 },
 buttonCash: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 12,
  backgroundColor: globalStyles.palette.primary[100],
  marginVertical: 8,
 },
 buttonCard: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 12,
  backgroundColor: 'white',
  marginVertical: 8,
  borderWidth: 1,
  borderColor: globalStyles.palette.neutral[10],
 },
 textButtonCash: {
  paddingVertical: 5,
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
 },
 textButtonCard: {
  paddingVertical: 5,
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: globalStyles.palette.neutral[80],
 },
 totalContainer: {
  flex: 0.15,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopWidth: 1,
  borderColor: globalStyles.palette.neutral[10],
  backgroundColor: 'white',
  paddingHorizontal: 28,
 },
});