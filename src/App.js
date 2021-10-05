import CurrentDate from "./current-date/current-date";
import Estimates from "./estimates/estimates";
import Graph from "./graph/graph";
import Header from "./header/header";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header></Header>

      <div className="body-container">
        {/* <div class="d-flex"> */}
        <Estimates></Estimates>
        <CurrentDate></CurrentDate>
        {/* </div> */}
        <Graph></Graph>
      </div>
    </div>
  );
}

export default App;
