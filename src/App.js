import "./styles.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <Weather city="Brasília" />

      <p>This project was coded by  <a href="https://github.com/Emili-Santana" target="_blank" rel="noreferrer">Emili Santana</a> and is open-sourced on <a href="https://github.com/Emili-Santana/Homework-Week-04" target="_blank" rel="noreferrer">Github</a> and hosted on <a href="https://my-weather-react-tec.netlify.app/" target="_blank" rel="noreferrer"> Netlify </a>
      </p>
   </div>
  );
}
