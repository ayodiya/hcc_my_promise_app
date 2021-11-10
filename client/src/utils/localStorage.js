export const tokenName = 'MyPromiseApp'

export const setToken = (tokenName, token) =>
  localStorage.setItem(tokenName, token)

export const getToken = tokenName => localStorage.getItem(tokenName)

export const removeToken = tokenName => localStorage.removeItem(tokenName)
