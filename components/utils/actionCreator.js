import getTemp from './getTemp'

export function isAddingAction() {
  return {type: 'ADDING'}
}

export function save() {
  return {type: 'SAVE'}
}

export function add(en,vn) {
  return {type: 'ADD',en,vn}
}

export function startFetch() {
  return {type: 'START_FETCH'}
}

export function fetchOK(cityName, temp) {
  return {type: 'FETCH_OK', cityName, temp}
}

export function fetchKO() {
  return {type: 'FETCH_KO'}
}

export function fetchThunk(cityName) {
  return dispatch => {
    dispatch(startFetch())
    getTemp(cityName)
    .then(temp => {
      dispatch(fetchOK(cityName, temp))
      console.log(temp)
    })
    .catch(err => dispatch(fetchKO()))
  }
}
