import {useState, useEffect} from 'react'
import axios from "axios"
const api_key = process.env.REACT_APP_API_KEY
const App = () => {
    const [countryName, setCountryName] = useState('')
    const [countries, setCountryList] = useState({})
    const [chosenCountry, setChosenCountry] = useState('')
    const [weather, setWeather] = useState({})
    const handleChange = event => {
        setCountryName(event.target.value)
        setChosenCountry('')
    }
    const selectCountry = country => {
        setChosenCountry(country)
    }
    useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
            .then(response => {setCountryList(response.data)})
    }, [])
    if (countries.length > 0) {
        const matchingCountries = countries.filter(country => country.name.common.toUpperCase().includes(countryName.toUpperCase()))
        return (
            <div>
                find countries <input value = {countryName} onChange = {handleChange}></input>
                <CountriesList countries = {matchingCountries} chosenCountry = {chosenCountry} selectCountry = {selectCountry} weather = {weather} setWeather = {setWeather}/>
            </div>
        )
    }
}
const CountriesList = ({countries, chosenCountry, selectCountry, weather, setWeather}) => {
    if (chosenCountry !== '') countries = [chosenCountry]
    if (countries.length > 10) return <p>Too many matches, specify another filter</p>
    if (countries.length > 1) return countries.map(country => <CountryName key = {country.name.common} country = {country} selectCountry = {selectCountry}/>)
    if (countries.length === 1) return <CountryCard country = {countries[0]} weather = {weather} setWeather = {setWeather} />
}

const CountryCard = ({country, weather, setWeather}) => {
    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
            .then(response => {setWeather(response.data)}, [])})

    if (Object.keys(weather).length > 0) {
        return (
            <div>
                <h1>{country.name.common}</h1>

                <p>Capital: <b>{country.capital}</b></p>
                <p>Population: <b>{country.population}</b></p>
                <p>Area: <b>{country.area}</b></p>

                <h4>Languages:</h4>
                <ul>
                    {Object.values(country.languages).map(language => <li key = {language}>{language}</li>)}
                </ul>

                <img src = {country.flags.png} alt = {`flag of ${country.name.common}`}/>
                <h3>Weather in {country.capital}</h3>
                <p>temperature {Math.round((weather.main.temp-273.15) * 10) / 10} degrees C</p>
                <img src = {`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}

const CountryName = ({country, selectCountry}) => {
    return (
        <div>
            {country.name.common} <button onClick = {() => selectCountry(country)}>show</button>
        </div>
    )
}
export default App