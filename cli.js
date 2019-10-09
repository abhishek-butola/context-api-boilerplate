#!/usr/bin/env node
const fs = require('fs');
const name = process.argv[2];
const nameFirstUpper = name.charAt(0).toUpperCase() + name.slice(1);

//////////////////////////////////////////////////////////////////////////////
const createContextData = `import React, { createContext } from 'react';

const ${name}Context = createContext();

export default ${name}Context;
`;
//////////////////////////////////////////////////////////////////////////////
const reducerData = `export default (state, action) => {
    switch (action.type) {
      
  
      default:
        return {
          ...state
        };
    }
  };`;

//////////////////////////////////////////////////////////////////////////////

const stateData = `import React, { useReducer } from 'react';
import ${nameFirstUpper}Context from './${name}Context';
import ${nameFirstUpper}Reducer from './${name}Reducer';

const ${nameFirstUpper}State = props => {
    const initialState = {
        data: null
    }

    const [state, dispatch] = useReducer(${nameFirstUpper}Reducer, initialState);

    const loadData = async()=>{
        //function
    }

    return (
        <${nameFirstUpper}Context.Provider
            value ={{
                data: state.data,
                loadData
            }}
        >
        {props.children}
        </${nameFirstUpper}Context.Provider>
    );
}

export default ${nameFirstUpper}State;`;

//////////////////////////////////////////////////////////////////////////////

fs.mkdirSync(name, { recursive: true }, error => {
  if (err) throw err;
});
fs.appendFileSync(`${name}/${name}Context.js`, createContextData, err => {
  if (err) throw err;
});

fs.appendFileSync(`${name}/${name}Reducer.js`, reducerData, err => {
  if (err) throw err;
});

fs.appendFileSync(`${name}/${nameFirstUpper}State.js`, stateData, err => {
  if (err) throw err;
});
