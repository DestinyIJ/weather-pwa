import React,{ useState, useRef }  from 'react'
import './App.css'

import { fetchWeather } from './api/fetchWeather'
import { useEffect } from 'react'

const App = () => {
    const [ query, setQuery ] = useState('')
    const [ weather, setWeather ] = useState({})

    const addToScreen = useRef()

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(query)
            setWeather(data)
            setQuery('')
        }
    }

    // console.log(addToScreen)

    useEffect(() => {
        let deferredPrompt;

        addToScreen.current.style.display = "none"
        window.addEventListener('beforeinstallprompt', (e) => {
            console.log(e)
            e.preventDefault();

            deferredPrompt = e;

            addToScreen.current.style.display = "block"

            addToScreen.current.addEventListener("click", () => {
                addToScreen.current.style.display = "none"
                deferredPrompt.prompt();

                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                    } else {
                    console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            })
        })
    }, [])


    return (
        <div className='main-container'>
            <button ref={addToScreen} id='a2hs' className="p-6 m-2 bg-white text-black text-xl rounded-xl">Add to Homescreen</button>
            <input 
                type="text"
                className="search"
                placeholder="Search City..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={search}
            />

            {
                weather?.main && (
                    <div className='city'>
                        <h2 className='city-name'>
                            <span>{weather?.name}</span>
                            <sup>{weather?.sys?.country}</sup>
                        </h2>

                        <div className='city-temp'>
                            <span>{Math.round(weather?.main?.temp)}</span>
                            <sup>&deg;C</sup>
                        </div>

                        <div className='info'>
                            <img 
                            src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`} 
                            alt={weather?.weather[0]?.description}
                            className='city-icon' />
                            <p>{weather?.weather[0]?.description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default App