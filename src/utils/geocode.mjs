import request from 'request'

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2FzbWFuMjEiLCJhIjoiY20xcGExejZ4MDF2OTJrc2E4MWViMWt2MiJ9.LqLn-MvdhJNt9mTu2km_ow&limit=1'

    request({url, json: true}, (error, {body} ={}) => {
        if(error) {
            callback('Unable to connect to location service', undefined)
        }
        else if(body.features.length === 0) {
            callback('There is no matching place. Please type again.', undefined)
        }
        else {
            callback(undefined, {
                latitute: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export default geocode