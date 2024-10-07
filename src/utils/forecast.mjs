import request from 'request'

const forecast = (lat, lon, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=14619be22410b8d751ae5fe8532f44cb&query=' + lat + ',' + lon

    request({url, json: true}, (error, {body} = {}) => {
        if(error) {
            callback('There is no connection to weather service', undefined)
        }
        else if(body.error) {
            callback(body.error.info, undefined)
        }
        else {
            callback(undefined, {
                temperature: body.current.temperature,
                weather_description: body.current.weather_descriptions[0],
                precip: body.current.precip,
                humidity: body.current.humidity,
                observation_time: body.current.observation_time
            })
        }
    })
}

export default forecast