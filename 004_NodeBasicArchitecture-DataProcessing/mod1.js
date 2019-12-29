// Exports one-by-one
exports.a = 12;
exports.b = 5;


// module.exports == exports
// Batch exports
module.exports = {
  a: 12,
  b: 5
};



module.exports = function() {
  console.log('aaa');
}


module.exports = class {
  constructor(name) {
    this.name = name;
  }

  show() {
    console.log(this.name);
  }
}

let c = 33;