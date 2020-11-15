import React, { useState, useEffect } from 'react';
import './App.css';
import Units from './Units.js';

function getUnit(name, slec){
  return Units[slec].filter((e) => {return e.name === name})[0];
}

function convertTo(name, unit, toName, selc){
  const [stunit, ndunit] = [getUnit(name, selc), getUnit(toName, selc)];
  return ((unit*stunit.to_meters)/ndunit.to_meters);

}

function App() {
  const [selected, setSelected]= useState("length");
  const [stselected, setStSelected] = useState("foot");
  const [ndselected, setNdSelected] = useState("foot");
  const [stchoice, setStChoice] = useState(1);
  const [ndchoice, setNdChoice] = useState(convertTo(stselected, stchoice, ndselected, selected));

  useEffect(() => {
    setStChoice(convertTo(ndselected, ndchoice, stselected, selected))
  }, [stselected])
  useEffect(() => {
    setNdChoice(convertTo(stselected, stchoice, ndselected, selected))
  }, [ndselected])

  return (
    <div className="App">
      <h1>Units Converter</h1>
      <select className="Choices" onChange={(e) => {setSelected(e.target.value)}}>
        {Object.keys(Units).map((u) => {
          return <option value={u}>{u[0].toUpperCase()}{u.slice(1)}</option>
        })}
      </select>
      <div className="Converts">
        <div className="Choice">
          <input type="number" onChange={(e) => {
            setStChoice(Number(e.target.value));
            setNdChoice(convertTo(stselected, e.target.value, ndselected, selected))
          }} value={stchoice}/>
          <br/>
          <select className="Choices" onChange={(e) => {
            setStSelected(e.target.value)
          }}>
            {Units[selected].map((unit) => {
              return (<option value={unit.name}>{`${unit.name} (${unit.unit})`}</option>)
            })}
          </select>
        </div>
        <div className="Choice">
          <input type="number" onChange={(e) => {
            setNdChoice(Number(e.target.value)); 
            setStChoice(convertTo(ndselected, e.target.value, stselected, selected))
          }} value={ndchoice}/>
          <br/>
          <select className="Choices" onChange={(e) => {
            setNdSelected(e.target.value)
          }}>
            {Units[selected].map((unit) => {
              return (<option value={unit.name}>{`${unit.name} (${unit.unit})`}</option>)
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
