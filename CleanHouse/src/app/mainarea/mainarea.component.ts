import { Component, OnInit } from '@angular/core';
import {CleanHouseService} from '../Services/clean-house.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mainarea',
  templateUrl: './mainarea.component.html',
  styleUrls: ['./mainarea.component.css']
})

export class MainareaComponent implements OnInit {

  // Booking: FormGroup;
  // submitted = false;
  
  services:any;
  cost:any;
  rooms:any;
  sqft:any;
  priceesss:any;
  total:any;
  selectedServices: any = {
    id: 0, Name: ''
  };
  Booking:any;
  record:any;
  submitted = false;
  constructor(private cS:CleanHouseService,private fB: FormBuilder) { }
  
  ngOnInit(): void {
    this.showAll();
    this.onSelect(this.selectedServices.Price);


    this.Booking = this.fB.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      Validators.minLength(1)]],  
      phno: ['', [Validators.required,Validators.maxLength(10)]],
      city: ['', [Validators.required,Validators.maxLength(3)]],
      zipcode: ['', [Validators.required,Validators.maxLength(6)]],
      service: ['', Validators.required],
      rooms: ['', Validators.required],
      sqft: ['', Validators.required],
      bookon: ['', Validators.required],
      standardCharges:[],
      totalPrice:[]
  });
  }
  get f() { 
    return this.Booking.controls; 
  }

  onSubmit() {
    this.Booking.value.standardCharges=this.selectedServices.id;
    this.Booking.value.totalPrice=this.total;
    console.log(this.Booking.value);
    this.cS.addrecord(this.Booking.value).subscribe((data) => {
      console.log(data);  
      this.record = data;
    });
      // this.submitted = true;
      // if (this.Booking.invalid) {
      //     return;
      // }
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.Booking.value, null, 4));
  }

  
  showAll(){
    this.cS.getAll().subscribe(
      (data:any)=>{
        this.services = data,
        console.log(this.services);   
      }
    )
  }

  // onSelect(service_id:any){
  //   this.cS.getAll().subscribe((res:any)=>{
  //     this.cost = res['services'].filter(
  //       (res:any)=>res.id == service_id!.value
  //     ),
  //     console.log(this.cost);
  //   })
  // }


  onSelect(service_id:any){
    //console.log(service_id)
    this.cS.getAll().subscribe((res:any)=>{
      // console.log(res)
      this.cost = res.services.filter((res:any)=>res.id==service_id);
    // if(res.id === service_id)
    //  {
    //     this.cost = this.services;
         
          this.total = Number(this.selectedServices.id) * Number(this.rooms) * Number(this.sqft)
          console.log(this.total);
          return Number(this.total);
    // console.log(this.total);
    //     return this.cost;
    //  }
    //     // return console.log(res)
    //   })
      //  console.log(this.selectedServices)  
      //  console.log(this.cost);
    })
  
}


  // calc(){
  //   this.cS.total(this.rooms, this.sqft, (result) => {
  //     this.res = result;
  //   });
  // }


}

  // onSelect(service_id:any){
  //   console.log(service_id)
  //   this.cS.getAll().subscribe((res:any)=>{
  //     console.log(res)
  //     this.charges = res.services.map((res:any)=>{
  //       if(res.id == service_id.id)
  //   {
  //       // this.charges = this.services;
  //       console.log(res.Price);
  //       // return this.charges;
  //   }
  //       console.log(res.id,service_id)
  //       // return console.log(res)
  //     })
  //      console.log(this.selectedServices)    
  //   })
  // }
  //   // this.services.map((data:any)=>{return data.Price}).subscribe((data:any)=>{console.log(data)})}
  //   // filter(
  //   //   (res:any)=>res.Price == service_id!.value


  //   // console.log(this.selectedServices);
  //   // if(this.services == service_id)
  //   // {
  //   //     this.charges = this.services;
  //   //     console.log(this.charges);
  //   //     return this.charges;
  //   // }
  //   // else if(this.services == "Kitchen Room")
  //   // {
  //   //     this.charges = 400;
  //   //     return this.charges;
  //   // }
  //   // else if(this.services == "Bathroom")
  //   // {
  //   //     this.charges = 550;
  //   //     return this.charges;
  //   // }
  //   // else{
  //   //     this.charges = 500;
  //   //     return this.charges;
  //   // }
  // }

  