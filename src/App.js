import {useState} from 'react';
import axios from "axios";

function App() {
  const [location, setLocation]= useState('');
  const [info,setInfo]=useState(null);
  const API_KEY="3cfa5acf16a8091d33abcab8f9803726";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;
  
  const handleLocation = (event) =>{
    setLocation(event.target.value)
  };

  const searchWeather= async (event) => {
    if(event.key==='Enter'){
      try{
        const response = await axios.get(
          URL
        );
        setInfo(response);
        console.log(response);
      }
      catch(error){
        alert("존재하지 않는 지역입니다.");
      }
    }
  }

  return (
    <div className="App">
      <div className="input_box">
        <input className="city" type="text" placeholder="도시를 입력하세요" value={location} onChange={handleLocation} onKeyDown={searchWeather}/>
        { info && info.data && info.data.name === location &&(
            <div className="weather_box">
            <div className="city_name">{info.data.name}</div>
            <div className="city_temperature">{Math.round(((info.data.main.temp)-273.15)*10/10)}°C</div>
            <div className="city_state">{info.data.weather[0].main}</div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
