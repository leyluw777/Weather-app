import { useEffect, useState } from 'react';
import './App.css';
import CloudSun from "./img/cloudy-svgrepo-com.svg"
import Sunny from './img/eclipse-svgrepo-com.svg'
import Hot from './img/sun-svgrepo-com.svg'
import Cloudy from "./img/cloudy.svg"
import Breeze from "./img/snowflake-svgrepo-com.svg"
import {FaWind} from 'react-icons/fa';
import {WiHumidity} from 'react-icons/wi'
import {FiSunrise} from 'react-icons/fi'

import {FiSunset} from 'react-icons/fi'


const App = () =>  {
 var [stateData, showData] =useState([])
 const [input, changeInput] = useState('Baku')
 const [city, searchCity] = useState(input)
 var [image, setImage] = useState({})

  const onInputChange = (event) => {
    changeInput(event.target.value)
  }

  const onBtnClick = () =>{
    searchCity(input)
  }

  const onPressed = (event) => {
      if (event.key  === "Enter"){
        searchCity(input)
      }
  }


  useEffect( () => {
    if (city){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fef78209263e455418c24fb2b02f15ce&units=metric`)
      .then(response => response.json())
      .then(data => {
        var temp = parseInt (data.main.temp);
        var feelsLike = parseInt(data.main.feels_like) ;
        var sunrise  = data.sys.sunrise;
        var dateSunrise = new Date(sunrise * 1000);
        var timeSunrise = dateSunrise.toLocaleTimeString();
        var sunset  = data.sys.sunset;
        var dateSunset = new Date(sunset * 1000);
        var timeSunset = dateSunset.toLocaleTimeString();
        var humidity = data.main.humidity;
        var wind = data.wind.speed;
        var infoArray = [ temp, feelsLike, timeSunrise, timeSunset, humidity, wind]
        showData(infoArray) 
      })
    }
    else {
      console.log("error")
    }
    }
  , [city])


  useEffect( () => {
  if ( stateData[0] < 0){
      return  setImage(Breeze)
  }
  else if ( (stateData[0] > 0) && (stateData[0] <= 10)){
    return setImage(Cloudy)
  }
  else if ( (stateData[0] > 10 ) && (stateData[0] <= 20 )){
    return setImage(CloudSun)
  }
  else if ( (stateData[0] > 20 ) && (stateData[0] <= 30 )){
    return setImage(Sunny)
  }
  else {
    return setImage(Hot)
  }
  })


  return (
    <div className=' text-center container py-5 px-5 text-gray-100'>
    
    <h1 className='text-center text-5xl font-bold  mb-4'>  The weather application </h1>
      <h2 className='text-xl  inline-block mt-4 mb-4' > Right now, the weather in </h2>
      <input className="border-b-2 border-b-gray-100 outline-none px-2 mx-2 bg-transparent font-bold text-xl" type='text' onChange={onInputChange} value={input} onKeyPress={onPressed} style={{width: `calc(${input.length}ch + 2ch) `}} /> 
      <h2 className='text-2xl  inline-block mr-2 mb-4'> is </h2>
      <div className='inner-section mt-3  flex justify-center lg:justify-between xl:justify-between items-center content-center flex-wrap '> 
        <img  src ={image}   className='w-1/3 lg:w-1/3 xl:w-1/3' /> 
        <div className='mt:my-3 w-full lg:w-1/3 xl:w-1/3'> 
        <p className='text-7xl text-gray-300 font-bold'> {stateData[0]}°   </p>
        <p > Feels like {stateData[1]}° </p>
         </div>

        
        
        <div className='add-info my-3 w-full lg:w-1/3 xl:w-1/3 flex justify-center items-center lg:justify-start xl:justify-start flex-col '>
        <span className='flex items-center justify-start'> <FaWind className='inline-block text-gray-300 mr-3' /> {stateData[5]} m/sec </span>
        <span className='flex items-center justify-start'> <WiHumidity className='inline-block text-2xl text-gray-300 mr-3' /> {stateData[4]} % </span>
       
         </div>

       </div>
      {/* <button onClick={onBtnClick} className='inline-block border-2 py-1 px-2 rounded'> Find city </button> */}
      <div className='last-section  flex w-1/3 lg:w-1/6 xl:w-1/6 items-center justify-between text-center '>
       <p> <FiSunrise className='inline-block text-gray-300  text-xl' /> {stateData[2]} </p>  | <p>   <FiSunset className='inline-block text-gray-300  text-xl' /> {stateData[3]}</p>  </div>
    </div>
  );
}

export default App;



// import { useState } from 'react';

// export default function App() {
//   const [message, setMessage] = useState('');

//   const [updated, setUpdated] = useState(message);

//   const handleChange = (event) => {
//     setMessage(event.target.value);
//   };

//   const handleClick = () => {
//     // 👇 "message" stores input field value
//     setUpdated(message);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         id="message"
//         name="message"
//         onChange={handleChange}
//         value={message}
//       />

//       <h2>Message: {message}</h2>
//       <h2>Updated: {updated}</h2>

// <button onClick={handleClick}>Update</button>
// </div>
// );
// }