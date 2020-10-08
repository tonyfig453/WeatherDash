var apiKey = "1ab537de237d433bced0798b30b1ed02";

var ourStartDate = moment().format('L');  
console.log("today's date: ", ourStartDate);

var tomorrow = moment().add(1, 'days').format('L'); 
console.log("tomorrow: ", tomorrow);

var dayAfterTomorrow = moment().add(2, 'days').format('L'); 
console.log("day after tomorrow: ", dayAfterTomorrow);

var threeDaysFromNow = moment().add(3, 'days').format('L'); ;
console.log("three days from now: ", threeDaysFromNow);

var fourDaysFromNow = moment().add(4, 'days').format('L'); 
console.log("four days from now: ", fourDaysFromNow);

var fiveDaysFromNow = moment().add(5, 'days').format('L'); 
console.log("five days from now: ", fiveDaysFromNow);


$("#searchButton").click(function(event){

    event.preventDefault();

    var allTheCities = [];

    var cityInputed = $("#citySearchInput").val();
    console.log("city: ", cityInputed);

    allTheCities = JSON.parse(localStorage.getItem("cities")) || [];
    allTheCities.push(cityInputed);
    localStorage.setItem("cities", JSON.stringify(allTheCities));



    showCityWeather(cityInputed);

})


function showCityWeather(city) {

    $("#cityInfo").empty();
    $("#dayOne").empty();
    $("#dayTwo").empty();
    $("#dayThree").empty();
    $("#dayFour").empty();
    $("#dayFive").empty();
    $("#listofCities").empty();


    var oneDayInTheCityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: oneDayInTheCityURL,
        method: "GET"
    })
    .then(function(response){
        
        console.log("Current City infomation: ",response);

        var latitude = response.coord.lat;
        console.log("latitude: " ,latitude);

        var longitude = response.coord.lon;
        console.log("longitude: ", longitude);
        
        console.log("does icon work?", response.weather[0].icon);
        
        var currentCityName = response.name;
        console.log("Current City Name: ", currentCityName);

        var currentCityTemperature = response.main.temp;
        console.log("Current City Temperature: ", currentCityTemperature);

        var currentCityHumidity = response.main.humidity;
        console.log("Current City Humidity: ", currentCityHumidity);

        var currentCityWindSpeed = response.wind.speed;
        console.log("Current City Wind Speed: ", currentCityWindSpeed);




        var iconPicture = response.weather[0].icon
        var icon = "http://openweathermap.org/img/w/" + iconPicture + ".png";
        var currentDayIcon = $(`<img src=${icon}>`)
        console.log("currenDayIcon", currentDayIcon);

        var cityDateIcon = $("<h3>").text(`${currentCityName}` + " (" + `${ourStartDate}` + ") ");
        $("#cityInfo").append(cityDateIcon, currentDayIcon);

        var todaysTemperature = $("<h5>").text("Temperature: " + `${currentCityTemperature}` + " °F");
        
        var todaysHumidity = $("<h5>").text("Humidity: " + `${currentCityHumidity}` + " %");
        
        var todaysWindSpeed = $("<h5>").text("Wind Speed: " + `${currentCityWindSpeed}` + " MPH");
        

        $("#cityInfo").append(todaysTemperature, todaysHumidity, todaysWindSpeed);
    
        fiveDayForecast(city,latitude, longitude);
    
    })

    

}

function fiveDayForecast(cityInputed, latitude, longitude){
    console.log("inside FiveDayForecast function");


    var fiveDayURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude={part}&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: fiveDayURL,
        method: "GET"

    }).then(function(response){

        console.log("5 Day Forecast: ", response);

        var currentUVIndex = response.current.uvi;
        console.log("UV Index: ", currentUVIndex);

        var todaysUVIndex = $("<h5>").text("UV Index: " + `${currentUVIndex}`);
        $("#cityInfo").append(todaysUVIndex);




        if(currentUVIndex <= 2.99){
            todaysUVIndex.css({"background-color": "green" , "width" : "150px"});
        }
        else if(currentUVIndex <= 5.99){
            todaysUVIndex.css({"background-color": "yellow" , "width" : "150px"});
        }
        else if(currentUVIndex <= 7.99){
            todaysUVIndex.css({"background-color": "orange" , "width" : "150px"});
        }
        else if(currentUVIndex <= 10){
            todaysUVIndex.css({"background-color": "red", "width" : "150px"});
        }
        else {
            todaysUVIndex.css({"background-color" : "purple", "width": "150px"});
        }
        


        var oneIcon = response.daily[0].weather[0].icon;
        var pictureOne = "http://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png";
        var twoIcon = response.daily[1].weather[0].icon;
        var pictureTwo = "http://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png";
        var threeIcon = response.daily[2].weather[0].icon;
        var pictureThree = "http://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png";
        var fourIcon = response.daily[3].weather[0].icon;
        var pictureFour = "http://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png";
        var fiveIcon = response.daily[4].weather[0].icon;
        var pictureFive = "http://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png";


        var oneTemperature = response.daily[0].temp.day;
        var twoTemperature = response.daily[1].temp.day;
        var threeTemperature = response.daily[2].temp.day;
        var fourTemperature = response.daily[3].temp.day;
        var fiveTemperature = response.daily[4].temp.day;

        var oneHumidity = response.daily[0].humidity;
        var twoHumidity = response.daily[1].humidity;
        var threeHumidity= response.daily[2].humidity;
        var fourHumidity = response.daily[3].humidity;
        var fiveHumidity = response.daily[4].humidity;


// Day 1
        var dayOneDate = $("<p>").text(tomorrow);
        var dayOneIcon = $("<img>").attr("src", pictureOne);
        var dayOneTemperature = $("<p>").text("Temperature: " + `${oneTemperature}` + " °F");
        var dayOneHumidity = $("<p>").text("Humidity: " + `${oneHumidity}` + " %");
        $("#dayOne").append(dayOneDate, dayOneIcon ,dayOneTemperature, dayOneHumidity);

// Day 2
        var dayTwoDate = $("<p>").text(dayAfterTomorrow);;
        var dayTwoIcon = $("<img>").attr("src", pictureTwo);
        var dayTwoTemperature = $("<p>").text("Temperature: " + `${twoTemperature}` + " °F");
        var dayTwoHumidity = $("<p>").text("Humidity: " + `${twoHumidity}` + " %");
        $("#dayTwo").append(dayTwoDate, dayTwoIcon ,dayTwoTemperature, dayTwoHumidity);

// Day 3 

        var dayThreeDate = $("<p>").text(threeDaysFromNow);;
        var dayThreeIcon = $("<img>").attr("src", pictureThree);
        var dayThreeTemperature = $("<p>").text("Temperature: " + `${threeTemperature}` + " °F");
        var dayThreeHumidity = $("<p>").text("Humidity: " + `${threeHumidity}`+ " %");
        $("#dayThree").append(dayThreeDate, dayThreeIcon ,dayThreeTemperature ,dayThreeHumidity);

// Day 4

        var dayFourDate = $("<p>").text(fourDaysFromNow);;
        var dayFourIcon = $("<img>").attr("src", pictureFour);
        var dayFourTemperature = $("<p>").text("Temperature: " + `${fourTemperature}` + " °F");
        var dayFourHumidity = $("<p>").text("Humidity: " + `${fourHumidity}`+ " %");
        $("#dayFour").append(dayFourDate, dayFourIcon ,dayFourTemperature ,dayFourHumidity);

// Day 5

        var dayFiveDate = $("<p>").text(fiveDaysFromNow);;
        var dayFiveIcon = $("<img>").attr("src", pictureFive);
        var dayFiveTemperature = $("<p>").text("Temperature: " + `${fiveTemperature}` + " °F");
        var dayFiveHumidity = $("<p>").text("Humidity: " + `${fiveHumidity}` + " %");
        $("#dayFive").append(dayFiveDate, dayFiveIcon ,dayFiveTemperature ,dayFiveHumidity);

    fullCityList();

    })

}


function fullCityList(){
    console.log("Inside the show the weather list function");

    var arrayFullofCities = JSON.parse(localStorage.getItem("cities"));
    console.log("array full of cities: ", arrayFullofCities);

    for(var i = 0; i < arrayFullofCities.length; i++){

        var aCity = arrayFullofCities[i];

        var cityButton = $("<button>").addClass("btn btn-secondary btn-group-vertical cityInList")
        .css({"background-color" : "white", "color" : "darkslategray", "border-color": "ghostwhite"})
        .text(`${aCity}`);
        $("#listofCities").append(cityButton);
    }
}

$("#listofCities").on("click", ".cityInList",function(event){
    console.log("my city button is working");

    event.preventDefault();

    var cityCalledOnList = ($(this).text());
    console.log("city called on list: ", cityCalledOnList);

    showCityWeather(cityCalledOnList);
})