"use strict";

if (!Array.prototype.empty) {
  Object.defineProperty(Array.prototype, 'empty', {
    value: function value(searchElement, fromIndex) {
      this.splice(0, this.length);
    }
  });
}
