import React from 'react'

const buildWeatherObject = (countryWeather) => {
	try{
		return {
			temperature: countryWeather.current.temperature,
			icon: countryWeather.current.weather_icons[0],
			wind: countryWeather.current.wind_speed,
			windDir: countryWeather.current.wind_dir,
		}
	}
	catch(error){
		console.log("Error trying to display the weather information")
		return undefined
	}

}

const Country = ({country, countryWeather}) => {
	let weather = 
		countryWeather === undefined || countryWeather.name !== country.name?
			undefined :
			buildWeatherObject(countryWeather)

  return(
    <div>
			<h3>{country.name}</h3>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h4>Spoken languages</h4>
			<ul>
			{
				country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)
			}
			</ul>
			<img 
				src={country.flag}
				alt="flag"
				height="60"
				width="100"
      />
			{
				weather === undefined ?
					<></> :
					<div>
						<h4>{`Weather in ${country.capital}`}</h4>
						<p><b>temperature :</b> {weather.temperature} Celsius</p>
						<img 
							src={weather.icon}
							alt="flag"
							height="60"
							width="50"
      			/>
						<p><b>wind:</b> {weather.wind} mph direction {weather.windDir}</p>
						{/* <p>name: {countryWeather.location.name}</p> */}
					</div>
			}
    </div>
  )
}

export default Country