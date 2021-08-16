import { useState, useCallback, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [ result, setResult ] = useState(false);
  const [ clicked, setClicked ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const input = useRef();

  const getPrime = useCallback((input) => {
    setClicked(true);
    setLoading(true);
    fetch(`/check-prime/${input.current.value}`)
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setResult(res.result);
      });
  }, [ setResult, setClicked, setLoading ]);


  const reset = useCallback(() => {
    setClicked(false);
    setResult(false);
    setLoading(false);
  }, [ setClicked, setResult, setLoading ]);


  const initial = !clicked && !loading;
  const final = clicked && !loading;

  return (
    <div className="App">
      <header className="App-header">
        { initial &&
          <>
            <input ref={input} />
            <button className="App-button" onClick={() => getPrime(input)}>Is it a Prime?</button>
          </>
        }
        { loading &&
          <div>loading...</div>
        }
        { final &&
          <>
            <div>{result.toString()}</div>
            <div className="App-link" onClick={reset}>Take me back...</div>
          </>
        }
      </header>
    </div>
  );
}

export default App;
