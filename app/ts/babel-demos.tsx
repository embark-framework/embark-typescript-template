// embark's default webpack config enables several babel plugins and presets


// @babel/preset-env, @babel/plugin-transform-runtime, @babel/runtime-corejs2

// provide trasforms and polyfills so you can develop with the latest JS
// features while supporting older browsers (built-ins are used if available)
// embark's default targets = browsers: ['last 1 version', 'not dead', '> 0.2%']


// @babel/plugin-proposal-class-properties (required by TypeScript)

class Bork {
  // instance properties
  instanceProperty = 'bork';
  boundFunction = () => {
    return this.instanceProperty;
  }
  // static class properties
  static staticProperty = 'babelIsCool';
  static staticFunction = function() {
    return Bork.staticProperty;
  }
}
let myBork = new Bork;
// property initializers are not on the prototype.
// @ts-ignore
console.log(myBork.__proto__.boundFunction); // undefined
// bound functions are bound to the class instance.
console.log(myBork.boundFunction.call(undefined)); // 'bork'
// static function exists on the class.
console.log(Bork.staticFunction()); // 'babelIsCool'


// @babel/plugin-proposal-object-rest-spread (required by TypeScript)

let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log(x); // 1
console.log(y); // 2
console.log(z); // { a: 3, b: 4 }


// @babel/plugin-syntax-dynamic-import

// there is presently a bug with webpack's lazy loading so the example below
// forces "eager" mode until it's fixed; that sort of defeats the purpose since
// in eager mode the chunk derived from ./log.ts will be written into
// dist/js/app.js along with the rest of the transpiled/packed code

(async function () {
  const m = await import(/* webpackMode: "eager" */ `./log`);
  console.log(m.default); // { hello: 'log module export' }
}());


// @babel/preset-react

// this template's tsconfig.json enables JSX support
// modules using JSX must have a .tsx filename extension

import React from 'react';
import ReactDOM from 'react-dom';
let div = document.createElement('div');
document.body.appendChild(div);
class MyComponent extends React.Component {
  render() {
    return (
        <div></div>
    );
  }
}
ReactDOM.render(<MyComponent />, div);


// babel-plugin-macros

// @ts-ignore
import it from 'param.macro';
const people = [
  { name: 'Jeff' },
  { name: 'Karen' },
  { name: 'Genevieve' }
]
console.log(people.map(it.name)); // ['Jeff', 'Karen', 'Genevieve']


// babel-plugin-transform-react-remove-prop-types

// in a production build, the 'prop-types' import and propTypes property will
// be stripped out of the source code

// when developing with TypeScript, usage of 'prop-types' is redundant unless
// the output of development builds may be used in contexts where runtime type
// checking is important and the babel/typescript toolchain is not available
import PropTypes from 'prop-types';
interface Props {
  name: string;
}
class Greeting extends React.Component<Props> {
  static propTypes = {
    name: PropTypes.string
  }
  render() {
    return (
        <h1>Hello, {this.props.name}</h1>
    );
  }
}
ReactDOM.render(<Greeting name={2}/>, document.createElement('div'));
