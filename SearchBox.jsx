import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import react,{useState} from "react";
export default function SearchBox({updateInfo}){
    let [city,setCity] = useState("");
    let [error,setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_Key = "606d53e103e41009c464b1dc73740d2f"

    let getWeatherInfo = async () => {
        try{
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_Key}&units=metric`)
        let jsonResponse = await response.json();
        //console.log(jsonResponse);
        let result = {
            city:city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description
        }
        console.log(result);
        return result;
    } catch(err) {
       throw err;
    }
    }
    
 
let handleChange = (evt) => {
    setCity(evt.target.value)
}
 let handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
        setCity("");
        setError(false); 
    } catch (err) {
        console.error("Error fetching weather:", err);
        setError(true); 
    }
};

    return(
        <div className="SearchBox">
           
            <form onSubmit={handleSubmit}>
                 <TextField id="city" label="City Name" variant="outlined" required value={city}
                 onChange={handleChange}/>
                 <br></br>
                 <br></br>
                
      <Button variant="contained" type = "Submit">
        Search
      </Button>
      {error && <p>No Such Place Exits</p>}
            </form>           
        </div>
    )
}