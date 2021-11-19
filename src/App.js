import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Age:
    <input type="text" name="age" />
  </label>
  <label>
    Id:
    <input type="text" name="id" />
  </label>
  <input type="submit" value="Submit" />
</form>
    </div>
  );
}

export default App;
