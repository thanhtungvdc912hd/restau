import {AsyncStorage} from 'react-native'

const saveCart = async (cart) => {
  try {
    await AsyncStorage.setItem('@cart', JSON.stringify(cart))
  } catch (err) {
    console.log(err);
  }

}

export default saveCart;
