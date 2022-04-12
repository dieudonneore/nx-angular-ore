import { Component } from '@angular/core';
import { GlobalService } from './global.service';
import { WeatherForecastApiService } from './weather-forecast-api.service';

@Component({
  selector: 'workspace-ore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-forecast-app';
  cities:any=[];
  myDays:any=[];
  city= "";
  coordonnate: any;
  longitude: any;
  latitude: any;
  fourlyDATA: any = [];
  dailyDATA:  any = [];
  mode=1;
  categoryData = "daily"
  hourly: any;
  hours: any = [];
  temperatures: any = [];

  color= '#04AA6D';
  color1=''


  public constructor( private weatherForecastApiService: WeatherForecastApiService,  private globalService: GlobalService){

  }

  ngOnInit(): void {
    console.log(this.mode);
    this.getCoordonate();
  }

  hourlyMode(){
    this.mode=1;
    console.log(this.mode)
    this.categoryData = "daily";
    console.log(this.categoryData);
    this.color="#ffa500";
    this.color1="";
    this.getCoordonate();
  }

  dailyMode(){
    this.mode=2;
    console.log(this.mode)
    this.categoryData = "hourly";
    console.log(this.categoryData);
    console.log(this.latitude);
    console.log(this.longitude);
    this.color1="#ffa500";
    this.color="";
    if(this.city!=""){
      this.getDaily();
    }

  }

  getCoordonate(){
    this.weatherForecastApiService.getCityCoordonates(this.city)
      .subscribe(data=>{
        console.log(data)

        this.coordonnate=data;
        this.globalService.coordonnateGlobal = this.coordonnate;

        this.longitude = this.coordonnate[0].lon;
        this.globalService.longitude = this.longitude
        console.log(this.longitude)
        this.latitude = this.coordonnate[0].lat;
        this.globalService.latitude = this.latitude
        console.log(this.latitude)
        console.log(this.categoryData);

        if(this.city!=""){
          this.getHourly();
        }
      })
  }

  getHourly(){
      this.weatherForecastApiService.getHourly(this.latitude, this.longitude, this.categoryData)
        .subscribe(data=> {
          console.log(" Hourly Data is");
          console.log(data);
          this.fourlyDATA = data;
          this.hourly = this.fourlyDATA.hourly;
          console.log(this.fourlyDATA.hourly);
          this.hourly[0].temp=this.city;
          Object.keys(this.hourly).forEach((key: any ) => {
            if(key%3===0&&key<=24){
              console.log(this.hourly[key]);
              this.temperatures.push(this.hourly[key]);
              console.log(this.hourly[key]);
            }
          });
          console.log("-----------------------")
          console.log(this.temperatures);
          console.log("----------------------")
          this.cities.push(this.temperatures);
          console.log(this.temperatures);
          this.temperatures=[];

        })
  }

  getDaily(){
      this.weatherForecastApiService.getDaily(this.latitude, this.longitude, this.categoryData)
        .subscribe(data=>{
          this.fourlyDATA = data;
          this.hourly = this.fourlyDATA.daily;
          this.hourly[0].temp.day=this.city;
          this.myDays.push(this.hourly);
          console.log(this.myDays);
          this.city="";
        })
  }


}
