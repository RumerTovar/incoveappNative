import { Text, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import StepIndicatorComponent from '../../components/homeScreen/stepIndicatorComponent/stepIndicatorComponent';
import { globalStyles } from '../../styles/global';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addSale } from '../../features/sales/salesSlice';
import { TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const height = Dimensions.get('window').height;

export default function AddClient({ navigation }) {
 const dispatch = useDispatch();

 const step = 0;

 return (
  <>
   <KeyboardAwareScrollView
    style={styles.container}
    enableOnAndroid
    extraHeight={130}
    scrollEnabled={false}>
    {/* <View style={styles.container}> */}
    <View style={styles.stepContainer}>
     <StepIndicatorComponent step={step} />
    </View>
    <Formik
     initialValues={{
      name: '',
      cedula: '',
      address: '',
      phone: '',
     }}
     onSubmit={(values) => {
      const extraData = {
       id: 2004689420,
       date: '2022-03-05',
       time: '03:10 PM',
       amount: 7500,
       image: require('../../assets/images/aspiradora.png'),
      };
      //add extraData to values
      values = { ...values, ...extraData };
      console.log(values, 'addClientLog');
      dispatch(addSale(values));
     }}>
     {(formikProps) => (
      <View style={styles.formContainer}>
       <View style={styles.card}>
        <TextInput
         label='Nombre'
         activeUnderlineColor={globalStyles.palette.primary[100]}
         style={styles.input}
         value={formikProps.values.name}
         onChangeText={formikProps.handleChange('name')}
        />
        <TextInput
         style={styles.input}
         label='Cedula'
         activeUnderlineColor={globalStyles.palette.primary[100]}
         keyboardType='numeric'
         onChangeText={formikProps.handleChange('cedula')}
         value={formikProps.values.cedula}
        />
        <TextInput
         style={styles.input}
         label='Dirección'
         activeUnderlineColor={globalStyles.palette.primary[100]}
         multiline
         onChangeText={formikProps.handleChange('address')}
         value={formikProps.values.address}
        />
        <TextInput
         style={styles.input}
         label='Teléfono'
         keyboardType='numeric'
         activeUnderlineColor={globalStyles.palette.primary[100]}
         onChangeText={formikProps.handleChange('phone')}
         value={formikProps.values.phone}
         selectionColor={globalStyles.palette.primary[100]}
        />
       </View>
      </View>
     )}
    </Formik>

    {/*  </View> */}
   </KeyboardAwareScrollView>
   <View style={styles.buttonContainer}>
    <Pressable
     style={styles.button}
     //onPress={() => navigation.navigate('payMethod')}
     //onPress={formikProps.handleSubmit}
    >
     <Text style={styles.textButton}>Crear cliente</Text>
    </Pressable>
   </View>
  </>
 );
}

const styles = StyleSheet.create({
 container: {
  backgroundColor: 'white',
  paddingHorizontal: 24,
  flex: 1,
 },
 stepContainer: {
  paddingVertical: 16,
 },

 formContainer: {
  flex: 1,
 },

 card: {
  backgroundColor: globalStyles.palette.primary[10],
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 16,
 },
 input: {
  backgroundColor: globalStyles.palette.primary[10],
 },
 cardButtomText: {
  color: globalStyles.palette.primary[100],
 },
 buttonContainer: {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  paddingTop: 1,
  backgroundColor: 'white',
  paddingHorizontal: 24,
 },
 button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 12,
  borderColor: '#e7e7e8',
  borderWidth: 1,
  marginBottom: 16,
  //backgroundColor: globalStyles.palette.primary[100]
 },
 textButton: {
  paddingVertical: 5,
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: '#e7e7e8',
 },
});