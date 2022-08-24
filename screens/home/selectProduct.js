import { StyleSheet, Text, View, FlatList } from 'react-native';
import { globalStyles } from '../../styles/global';
import { useSelector, useDispatch } from 'react-redux';
import CardComponent from '../../components/inventory/cardComponent/cardComponent';
import { MaterialIcons } from '@expo/vector-icons';
import { IconButton, Badge } from 'react-native-paper';
import { filterProducts } from '../../features/inventory/inventorySlice';
import { useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect } from '@react-navigation/native';
import { turnOffSearch } from '../../features/inventory/inventorySlice';
import { useCallback } from 'react';

export default function SelectProduct({ route, navigation }) {
 const [visible, setVisible] = useState(false);
 const [error, setError] = useState(false);

 useFocusEffect(
  useCallback(() => {
   dispatch(turnOffSearch());
  }, [navigation])
 );

 const onToggleSnackBar = () => {
  setVisible(!visible);
  setError(false);
 };
 const onDismissSnackBar = () => setVisible(false);

 const onToggleError = () => setError(!error);
 const onDismissError = () => setError(false);

 const { descripcion } = route.params;
 const subCathegoryName = descripcion;
 const subCathegoryId = route.params.id;

 const categorizedProducts = useSelector(
  (state) => state.inventory.categorizedProducts
 );

 const searchProduct = useSelector((state) => state.inventory.filterProducts);

 const cart = useSelector((state) => state.inventory.cart);

 const dispatch = useDispatch();

 const initialValue = 0;
 const total = cart
  .map((product) => product.quantity)
  .reduce(
   (previousValue, currentValue) => previousValue + currentValue,
   initialValue
  );

 useEffect(() => {
  dispatch(filterProducts(subCathegoryId));
 }, []);

 const onSubmit = () => {
  if (total) {
   navigation.navigate('SelectedProducts');
  } else {
   onToggleError();
  }
 };

 return (
  <>
   <View
    style={{
     flex: 1,
     backgroundColor: globalStyles.palette.neutral[0],
    }}>
    <KeyboardAwareScrollView>
     <View style={styles.title}>
      <Text style={globalStyles.typography.regular[4]}>
       {subCathegoryName.charAt(0).toUpperCase() + subCathegoryName.slice(1)}
      </Text>
     </View>
     <View style={styles.container}>
      {searchProduct.length === 0
       ? categorizedProducts.map((product, index) => (
          <CardComponent
           key={index}
           item={product}
           id={product.productId}
           image={product.productImage}
           name={product.productName}
           description={product.productDescription}
           amount={product.productPrice}
           navigation={navigation}
           onToggleSnackBar={onToggleSnackBar}
          />
         ))
       : searchProduct.map((product, index) => (
          <CardComponent
           key={index}
           item={product}
           id={product.productId}
           image={product.productImage}
           name={product.productName}
           description={product.productDescription}
           amount={product.productPrice}
           navigation={navigation}
           onToggleSnackBar={onToggleSnackBar}
          />
         ))}
     </View>
    </KeyboardAwareScrollView>

    <View style={styles.boxContainer}>
     <View style={styles.box}>
      <Badge
       visible={cart.length ? true : false}
       style={{
        backgroundColor: globalStyles.palette.primary[100],
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
       }}>
       {total}
      </Badge>
      <IconButton
       type='outlined'
       icon={() => (
        <MaterialIcons name='add-shopping-cart' size={24} color='black' />
       )}
       color={globalStyles.palette.primary[100]}
       size={20}
       style={styles.iconBox}
       onPress={onSubmit}
      />
     </View>
     <Snackbar
      style={{
       backgroundColor: globalStyles.palette.primary[100],
      }}
      duration={1500}
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
       label: 'Entendido',
       onPress: () => {},
      }}>
      Producto Agregado
     </Snackbar>
     <Snackbar
      style={{
       backgroundColor: 'red',
      }}
      duration={1500}
      visible={error}
      onDismiss={onDismissError}>
      Debe agregar al menos un producto
     </Snackbar>
    </View>
   </View>
  </>
 );
}

const styles = StyleSheet.create({
 container: {
  paddingBottom: 30,
  flex: 1,
  backgroundColor: globalStyles.palette.neutral[0],
 },
 title: {
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  backgroundColor: globalStyles.palette.neutral[0],
  paddingLeft: 24,
 },
 list: {
  marginBottom: 60,
 },
 boxContainer: {
  position: 'absolute',
  alignItems: 'center',
  top: '91%',
  width: '100%',
  height: 48,
 },
 box: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: 62,
  height: 48,
  borderRadius: 20,
  backgroundColor: '#E7E7E8',
 },
 iconBox: {
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 4,
  width: 36,
  height: 36,
  borderRadius: 12,
  backgroundColor: 'white',
 },
});
