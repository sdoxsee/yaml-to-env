import './App.css';
import { Input } from 'reactstrap';
import yaml from 'js-yaml';

import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [name, setName] = useState('foo: bar');
  const [properties, setProperties] = useState();

  useEffect(() => {
    // try {
    //   const data = yaml.load(`${name}`);
    //   var entries = deflate(data); // Convert the JSON structure into an array of strings
    //   console.log(entries);
    //   setProps(entries);
    // } catch (e) {
    //    console.log(e);
    // }
    // // document.title = `Hello, ${name}`;
  });

  const onChangeHandler = event => {
    try {
      setName(`${event.target.value}`);
      // https://github.com/jusufazer/yaml2properties/blob/master/src/scripts/processor.js
      const data = yaml.load(`${event.target.value}`);
      console.log(data);
      var entries = deflate(data); // Convert the JSON structure into an array of strings
      console.log(entries);
      setProperties(entries);
    } catch (e) {
       console.log(e);
    }
  };

  var isNumeric = function (str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  var deflate = function (json, prefix) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        var _prefix;

        if (typeof json[ key ] === 'object') {
            var _currPrefix = key.concat(Array.isArray(json[key]) ? '_' : '.');
            _prefix = prefix ? prefix.concat(_currPrefix) : _currPrefix;
            result = result.concat(deflate(json[ key ], _prefix));
        } else {
            _prefix = prefix ? prefix.concat(key) : key;
            if (isNumeric(key)) {
              _prefix = _prefix.concat("_");
            }
            result.push(_prefix.concat('=').concat(json[ key ]));
        }
    });

    return result;
  };

  return (
    <div>
      <div align="right">
        <a href="https://github.com/sdoxsee/yaml-to-env">Github Repository</a>
      </div>
        
       {/* className="App"> */}
      {/* <h1>Hello, {name}!</h1> */}
      <h3>Spring Boot YAML</h3>
      <Input style={{height: "250px"}} type="textarea" value={name} onChange={onChangeHandler}/>
      {/* <button onClick={() => setName('James')}>
        Click me to change the name
      </button> */}
      <h3>Spring Boot Environment Variables</h3>
      <div className="users" align="left">
        {properties && properties.map((property, index) => (
          <div key={index}>
            {property.split("=")[0].toUpperCase().replaceAll("-", "").replaceAll(".","_")}=
            {property.split("=")[1]}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

// handleClick = () => {
//   // Get document, or throw exception on error
//   try {
//     const doc = yaml.load("foo: bar");
//     console.log(doc);
//   } catch (e) {
//     console.log(e);
//   }
//   console.log('this is:', this);
// }

// function App() {
//   return (
//     <div>
//       <Input type="textarea" name="text" id="exampleText" />
//       <Button color="danger" onClick={handleClick}>Danger!</Button>
//     </div>
//   );
// }

// export default App;
