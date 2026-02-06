import { BrowserRouter } from "react-router-dom";
import RouteComponents from "./routes/RouteComponents";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <RouteComponents />
      </BrowserRouter>
    </div>
  );
}

export default App;
