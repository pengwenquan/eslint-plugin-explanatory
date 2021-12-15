# description:
a rule to check explanatory note content: cannot cantain words like fixme. you can declare some words youself.You can use it to remind yourself not to forget to do something


# usage:
```
npm install eslint-plugin-explanatory -D

```


```
// .eslintrc.js
module.exports = {
  plugins: [ 'explanatory' ],
  rules: { 
    "explanatory/explanatory": "error" // default word key: fixme
    // or declare keyWords youself
    'explanatory/explanatory': ['error', {keyWords: ['todo', 'fixme']}] // keyWords can be any words
 }
}
```
