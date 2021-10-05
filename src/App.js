import './App.css';
import Header from './header/header';
import Estimates from './estimates/estimates';
import CurrentDate from './current-date/current-date';
import Graph from './graph/graph';

function App() {
  return (
    <div className="App">
      <Header></Header> 

     <div class="body-container">
       <Estimates></Estimates>
       <CurrentDate></CurrentDate>
       <Graph></Graph>
       </div>
    </div>
  );
}

export default App;
