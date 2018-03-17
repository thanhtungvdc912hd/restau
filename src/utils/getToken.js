import {AsyncStorage} from 'react-native'

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@tokenMyRestau')
    return token ? token : ''
  } catch (error) {
    return ''
  }

}

export default getToken;
