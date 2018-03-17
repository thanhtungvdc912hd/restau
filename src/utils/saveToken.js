import {AsyncStorage} from 'react-native'

const saveToken = async (token) => {
  await AsyncStorage.setItem('@tokenMyRestau', token)
}

export default saveToken;
