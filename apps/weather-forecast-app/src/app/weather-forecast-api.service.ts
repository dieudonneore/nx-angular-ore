import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordonnate } from './models.coordonnates.ts/coordonnates';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastApiService {

  private _apiKey = '010721642521f31b0fbc8c3831d45951';

  coordonnateURL = 'http://api.openweathermap.org/geo/1.0/direct?'; // q={city name}&limit=1&appid={API key}

  weatherHourlyURL = 'https://api.openweathermap.org/data/2.5/onecall?'; //lat={lat}&lon={lon}&exclude=current,minutely,daily,alerts&appid={API key}

  weatherDailyURL = 'https://api.openweathermap.org/data/2.5/onecall?'; // lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&appid={API key}


  constructor(private httpClient: HttpClient) {
    console.log("api");
  }

  getCityCoordonates(city:string):Observable<Coordonnate>{
    const data = "q=" + city + "&limit=1&appid=010721642521f31b0fbc8c3831d45951"
    return this.httpClient.get<Coordonnate>(this.coordonnateURL+data)
            .pipe(response=> response);
  }

  getHourly(lat:string, lon:string, cat:string){
    const data = "lat=" + lat + "&lon=" + lon + "&units=metric&exclude=current,minutely," + cat + ",alerts&appid=010721642521f31b0fbc8c3831d45951"
    return this.httpClient.get(this.weatherHourlyURL+data)
            .pipe(response=>response);
  }

  getDaily(lat:string, lon:string, cat:string){
    const data = "lat=" + lat + "&lon=" + lon + "&units=metric&exclude=current,minutely," + cat + ",alerts&appid=010721642521f31b0fbc8c3831d45951"
    return this.httpClient.get(this.weatherHourlyURL+data)
            .pipe(response=>response);
  }
}
