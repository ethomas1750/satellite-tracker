let locationOfAdress = document.querySelector("#location")
let satelliteCode = document.querySelector("#norad")
let adress
let satellite
locationOfAdress.addEventListener("change",(event)=>{
    adress = event.target.value
    adress = encodeURI(adress)
    console.log(adress)
})

searchBtn.addEventListener('click', ()=>{
    console.log('testing 123')
    let locationInput = document.querySelector('#location').value
    let satCodeInput = document.querySelector('#norad').value
    let encodeLocation = encodeURI(locationInput)
    let encodeSatCode = encodeURI(satCodeInput)
    let geoAPI = `https://geocode.maps.co/search?q=${encodeLocation}&api_key=${apiKey}`

   
    fetch(geoAPI)
    .then((response)=>{
        console.log('testing fetch')
        return response.json()
    })
    .then((info)=>{
        console.log(info)
        let latitude = info[0].lat
        let longitude = info[0].lon
        let satPassAPI = `https://satellites.fly.dev/passes/${document.querySelector('#norad').value}?lat=${latitude}&lon=${longitude}&limit=1`
        return fetch(satPassAPI)
    })
    .then ((response)=>{
        console.log('satPassAPI response')
        return response.json()
    })
    .then((obj)=>{
        console.log(obj)
        if(obj[0]){
            document.querySelector('.details').innerHTML = `Rise: ${obj[0].rise.utc_datetime}, Culminate: ${obj[0].culmination.utc_datetime}, Set: ${obj[0].set.utc_datetime}`
        }
        document.querySelector('#location').value = ''
        document.querySelector('#norad').value = ''
    })
   

    .catch((error) => console.log(error))

})

