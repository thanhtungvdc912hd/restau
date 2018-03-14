import {AsyncStorage} from 'react-native'

const getCart = async () => {
  try {
    const cart = await AsyncStorage.getItem('@cart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    return []
  }

}

export default getCart;
