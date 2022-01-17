const delay = (ms) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(ms);
      resolve();
    }, ms, ms);
  })
}

const test = () => {
  delay(400).then(() => {
    console.log('finished')
  })
};

test()

let obj = {
  a: 1,
  b: {
    c: 2
  }
}

let obj2 = JSON.parse(JSON.stringify(obj))
obj2.b.c = 4;
console.log(obj)
console.log(obj2)
