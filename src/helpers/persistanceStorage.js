export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.log('Error while getting data from the localStorage', e)
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.log('Error while saving data in the localStorage', e)
  }
}
