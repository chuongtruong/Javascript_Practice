window.addEventListener('load', () => {
    let long;
    let lat;
    const key = "e6659ff138c028f533b7b726a4fdbc98";
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // console.log(lat);
            // console.log(long);

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;
            // console.log(api)
            fetch(api)
                .then(response => {
                    return response.json()
                })

                .then(data => {
                    console.log(data)
                    const { temp } = data.main;
                    const { description } = data.weather[0];
                    const { name } = data;
                    console.log(description.includes("cloud"));

                    //SET DOM ELEMENTS FROM THE API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = name;
                    //Set Icons
                    setIcon(description, document.querySelector(".icon"));
                })
        });


    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ "color": "white" });
        let currentIcon = "";

        if(icon.includes("cloud".toLowerCase())){
            currentIcon = "CLOUDY";
        }
        
        if(icon.includes("sun".toLowerCase())){
            currentIcon = "SUNNY";
            alert("true");
        }

        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});