 class CustomArray extends Array {

}

Object.defineProperty(CustomArray.prototype, 'empty', {
  value: function(searchElement, fromIndex) {
    this.splice(0, this.length)
  }
})

module.exports = CustomArray
