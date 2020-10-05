const APIKey = "d35a73093d133443da9c247850a26db9";

moment().format();

function callOpenWeatherHourly(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        
        .then(function (response) {
            
            
            console.log(response);
            let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
            let tempHi = (response.list[0].main.temp_max - 273.15) * 1.80 + 32;
            let tempLo = (response.list[0].main.temp_min - 273.15) * 1.80 + 32;
            // let x = response.list[0].wind.deg
            let direction = windDirect(response.list[0].wind.deg);
            
            
            $(".emptyMe").text("");
            $("#city").text(response.city.name);
            $("#temp").text(tempF.toFixed(0) + "°");
            $("#weather").text(response.list[0].weather[0].main);
            $("#hiTemp").text("Hi: " + tempHi.toFixed(0));
            $("#loTemp").text("Lo: " + tempLo.toFixed(0));
            $("#windSpeed").text("Wind Speed: " + response.list[0].wind.speed.toFixed(0) + "mph");
            $("#windDirect").text("Wind Direction: " + direction);
            
            function windDirect(x) {
                if (x >= 341 || x <= 20) {
                    let d = "N"
                    return d;
                }
                if (x >= 21 && x <= 70) {
                    let d = "NE"
                    return d;
                }
                if (x >= 71 && x <= 110) {
                    let d = "E"
                    return d;
                }
                if (x >= 111 && x <= 160) {
                    let d = "SE"
                    return d;
                }
                if (x >= 161 && x <= 200) {
                    let d = "S"
                    return d;
                }
                if (x >= 201 && x <= 250) {
                    let d = "SW"
                    return d;
                }
                if (x >= 251 && x <= 290) {
                    let d = "W"
                    return d;
                }
                if (x >= 291 && x <= 341) {
                    let d = "NW"
                    return d;
                }
                return d;
            };
            
            function getIcon() {
                let weatherCon = response.list[0].weather[0].main;
                console.log(weatherCon)
                if ( weatherCon == "Clear") {
                    $("#todayIcon").attr("src","assets/sunny.png");
                }
                if (weatherCon == "Snow") {
                    $("#todayIcon").attr("src","assets/snow.png");
                }
                if (weatherCon =="Rain") {
                    $("#todayIcon").attr("src","assets/rain.png");
                }
                if (weatherCon == "Thunderstorm") {
                    $("#todayIcon").attr("src","assets/tstorm.png");
                }
                if (weatherCon == "Clouds" && response.list[0].clouds.all <= 33 ) {
                    $("#todayIcon").attr("src","assets/lightclouds.png");
                }
                if (weatherCon == "Clouds" && response.list[0].clouds.all >= 34 && response.list[0].clouds.all <= 66 ) {
                    $("#todayIcon").attr("src","assets/mostlycloudy.png");
                }
                if (weatherCon == "Clouds" && response.list[0].clouds.all >=67 ) {
                    $("#todayIcon").attr("src","assets/allclouds.png");
                }
            }
            getIcon();

            // let forecast1  = moment().add(1,'days');
            // let forecast2  = moment().add(2,'days');
            // let forecast3  = moment().add(3,'days');
            // let forecast4  = moment().add(4,'days');
            // let forecast5  = moment().add(5,'days');
            // let day1 = (forecast1.format("ddd, Do"));
            // let day2 = (forecast2.format("ddd, Do"));
            // let day3 = (forecast3.format("ddd, Do"));
            // let day4 = (forecast4.format("ddd, Do"));
            // let day5 = (forecast5.format("ddd, Do"));
            let count = 1;
            let q = 7;
            $(".forecast").each(function () {
                let day = moment().add(count,'days');
                let forecastDay = (day.format("ddd, Do"));
                let tempF = (response.list[q].main.temp - 273.15) * 1.80 + 32;
                let pop = (response.list[q].pop) * 100;
                $("#forecastDate" + count).text(forecastDay);
                $("#forecastTemp" + count).text(tempF.toFixed(0) + "°");
                $("#forecastPop" + count).text(pop + ("%"));
                function getIcon() {
                    let weatherCon = response.list[q].weather[0].main;
                    console.log(weatherCon)
                    if ( weatherCon == "Clear") {
                        $(`#forecastIcon${count}`).attr("src","assets/sunny.png");
                    }
                    if (weatherCon == "Snow") {
                        $(`#forecastIcon${count}`).attr("src","assets/snow.png");
                    }
                    if (weatherCon =="Rain") {
                        $(`#forecastIcon${count}`).attr("src","assets/rain.png");
                    }
                    if (weatherCon == "Thunderstorm") {
                        $(`#forecastIcon${count}`).attr("src","assets/tstorm.png");
                    }
                    if (weatherCon == "Clouds" && response.list[q].clouds.all <= 33 ) {
                        $(`#forecastIcon${count}`).attr("src","assets/lightclouds.png");
                    }
                    if (weatherCon == "Clouds" && response.list[q].clouds.all >= 34 && response.list[q].clouds.all <= 66 ) {
                        $(`#forecastIcon${count}`).attr("src","assets/mostlycloudy.png");
                    }
                    if (weatherCon == "Clouds" && response.list[q].clouds.all >=67 ) {
                        $(`#forecastIcon${count}`).attr("src","assets/allclouds.png");
                    }
                }
                getIcon();
                
                count ++;
                q = q + 8;
                console.log(q);
            });  
        });
}


$("#searchSubmit").click(function () {
    let cityName = $("#citySearch").val();
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    callOpenWeatherHourly(queryURL);
});

$(".citySubmit").click(function () {
    let cityName = $(this).data("button");
    const queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;
    callOpenWeatherHourly(queryURL);
});
