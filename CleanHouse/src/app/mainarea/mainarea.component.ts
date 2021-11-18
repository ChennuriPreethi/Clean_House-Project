import { Component, OnInit } from '@angular/core';
import {CleanHouseService} from '../Services/clean-house.service';

@Component({
  selector: 'app-mainarea',
  templateUrl: './mainarea.component.html',
  styleUrls: ['./mainarea.component.css']
})

export class MainareaComponent implements OnInit {

  services:any;
  charges:any;
  s1:any;
  selectedServices: any = {
    id: 0, Name: ''
  }
  
  constructor(private cS:CleanHouseService) { }
  
  ngOnInit(): void {
    this.showAll();
    this.onSelect(this.selectedServices.id);
  }
  showAll(){
    this.cS.getAll().subscribe(
      (data:any)=>{
        this.services = data;
        console.log(this.services);      
      }
    )
  }


  onSelect(service_id:any){
    this.cS.getAll().subscribe((res:any)=>{
      this.charges = res['services'].map((data:any)=>{return data.Price})
       console.log(this.selectedServices)    
    })
  }
    // this.services.map((data:any)=>{return data.Price}).subscribe((data:any)=>{console.log(data)})}
    // filter(
    //   (res:any)=>res.Price == service_id!.value


    // console.log(this.selectedServices);
    // if(this.services == service_id)
    // {
    //     this.charges = this.services;
    //     console.log(this.charges);
    //     return this.charges;
    // }
    // else if(this.services == "Kitchen Room")
    // {
    //     this.charges = 400;
    //     return this.charges;
    // }
    // else if(this.services == "Bathroom")
    // {
    //     this.charges = 550;
    //     return this.charges;
    // }
    // else{
    //     this.charges = 500;
    //     return this.charges;
    // }
  }

