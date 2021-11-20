import { Component, OnInit } from '@angular/core';
import {CleanHouseService} from '../Services/clean-house.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainarea',
  templateUrl: './mainarea.component.html',
  styleUrls: ['./mainarea.component.css']
})

export class MainareaComponent implements OnInit {
  services:any;
  cost:any;
  rooms:any;
  sqft:any;
  total:any;
  selectedServices: any = {
    id: 0, Name: ''
  };
  Booking:any;
  record:any;
  submitted = false;
  user:any={};
  ls:any;
  details:any;
  name:any;
  email:any;
  phno:any;
  city:any;
  zipcode:any;
  service:any;
  bookon:any;
  standardCharges:any;
  totalPrice:any;
  records:any;
  constructor(private cS:CleanHouseService,private fB: FormBuilder) {
    this.ls=localStorage.getItem('Users')
    if(this.ls!=null){
      this.details=JSON.parse(this.ls)
      this.name=this.details.name
      this.email=this.details.email 
      this.phno=this.details.phno 
      this.city=this.details.city 
      this.zipcode=this.details.zipcode    
      this.service=this.details.service 
      this.rooms=this.details.rooms 
      this.sqft=this.details.sqft 
      this.bookon=this.details.bookon 
      this.standardCharges=this.details.standardCharges 
      this.totalPrice=this.details.totalPrice 
    }
   }
  
  ngOnInit(): void {

    this.showAll();
    this.onSelect(this.selectedServices.Price);
    this.Booking = this.fB.group({
      name: [this.name, Validators.required],
      email: [this.email,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      Validators.minLength(1)]],  
      phno: ['', [Validators.required,Validators.maxLength(10)]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required,Validators.maxLength(6)]],
      service: ['', Validators.required],
      rooms: ['', Validators.required],
      sqft: ['', Validators.required],
      bookon: ['', Validators.required],
      standardCharges:[],
      totalPrice:[]  
  });
  this.cS.getAllRecord().subscribe((data: any) => {
    this.records = data;
  });
  }
  get f() { 
    return this.Booking.controls; 
  }

  onSave(){
      this.Booking.value.standardCharges=this.selectedServices.id;
      this.Booking.value.totalPrice=this.total;
      console.log("save",this.Booking.value);
      this.user=Object.assign(this.user, this.Booking.value)
      localStorage.setItem('Users',JSON.stringify(this.user));
  }

  onSubmit() {
    this.Booking.value.standardCharges=this.selectedServices.id;
    this.Booking.value.totalPrice=this.total;
    console.log(this.Booking.value);
    this.cS.addrecord(this.Booking.value).subscribe((data) => {
      console.log(data);  
      this.record = data;
    });
    localStorage.removeItem('Users')
    
    // this.submitted = true;
    alert('SUCCESS!!');
    this.Booking.reset()  
  }

  
  showAll(){
    this.cS.getAll().subscribe(
      (data:any)=>{
        this.services = data,
        console.log(this.services);   
      }
    )
  }

  onSelect(service_id:any){
    this.cS.getAll().subscribe((res:any)=>{
      this.cost = res.services.filter((res:any)=>res.id==service_id);
      this.total = Number(this.selectedServices.id) * Number(this.rooms) * Number(this.sqft)
      return Number(this.total);
    })
  }

 

}  