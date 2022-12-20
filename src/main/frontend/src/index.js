import React from 'react';
import ReactDOM from 'react-dom/client';
//alter code, darueber neuer code
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//alter code - darunter neuer code
/*function Welcome(props) {
    return <h1> Hello, {props.name}, {props.nachname}</h1>
}

const element = <Welcome name="Sara" nachname="Simpson" />;

ReactDOM.render(
    element,
    document.getElementById('root')
);

ReactDOM.render(<App />, document.getElementById('root'));*/




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
