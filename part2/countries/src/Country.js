import React from 'react'

const Country = ({country}) => {
  return(
    <div>
			<h3>{country.name}</h3>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h4>languages</h4>
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
    </div>
  )
}

export default Country