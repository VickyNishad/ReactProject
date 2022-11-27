import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Login</h1>
      <form>
        <input type="text" placeholder="Enter User id" className="input" />
        <br /> <br />
        <input type="text" placeholder="Password" className="input" />
        <br /> <br />
        <button>submit</button>
      </form>
    </div>
  );
}
