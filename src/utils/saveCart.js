import {AsyncStorage} from 'react-native'

const saveCart = async (cart) => {
  await AsyncStorage.setItem('@cart', JSON.stringify(cart))
}

export default saveCart;
