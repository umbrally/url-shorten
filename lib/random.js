const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const upperCase = lowerCase.map(letter => letter.toUpperCase())
const number = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const collection = lowerCase.concat(upperCase).concat(number)
const length = 5


module.exports = () => {
  // let shortURL = 'http://localhost:3000/'
  let randomCode = ''
  for (let i = 0; i < length; i++) {
    let randomNumber = Math.floor(Math.random() * 62)
    randomCode += collection[randomNumber]
  }
  return randomCode
}