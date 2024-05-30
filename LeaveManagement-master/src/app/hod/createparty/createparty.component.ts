import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { leavemodel } from 'src/app/leavemodel';
import { HttphandlerService } from 'src/app/shared/http-handler.service';

@Component({
  selector: 'app-createparty',
  templateUrl: './createparty.component.html',
  styleUrls: ['./createparty.component.css']
})
export class CreatepartyComponent {

  public leave: leavemodel = {} as leavemodel;
  startDate!: Date;
  reason!: string;
  name!: string;
  constructor(private httserve:HttphandlerService,private route:Router){}

  ngOnInit(){

// if (storedItem !== null) {
//   this.info = JSON.parse(storedItem);
//   console.log(this.info);
// } else {
//   console.log('Item not found in localStorage');
// }



  }
  apply(){
    // this.api.applyleave(this.leave).subscribe((res)=>{
    //   alert("leaveaplysuccessfully"),
    //   this.route.navigate(['/viewleave'])
    // })

    const millisecondsPerDay = 24 * 60 * 60 * 1000; 
      const startTime = this.startDate.getTime();
    let startFrom: string = this.startDate.toString().slice(3, 15);
    let postLeaveObj: any = {
      leaveStart: startFrom,
      leaveReason: this.reason,
      Pname : this.name
    }

    this.httserve.postpartydet(postLeaveObj).subscribe((param:any)=>{
      this.httserve.getPartydetails();
      this.httserve.partydetails.next(postLeaveObj)
      console.log(param);
      console.log(postLeaveObj)
    })

    console.log(postLeaveObj)

    // this.httserve.getLeaveDataOfStaff(this.info.email).subscribe((param:any)=>{
    //   for(let leave in param){
    //     // if(param[leave].statusLeave == "Pending  "){
    //     //   console.log('')
    //     //   alert('Already applied for leave. Please wait till the status of leave Applied.')
    //     //   return
    //     // }
    //   }
    //   if(this.info.totalLeaves >= numberOfDays){
    //     this.httserve.postLeaveData(postLeaveObj).subscribe((param: any) => {
    //       console.log(param)
    //        this.httserve.getLeaveDataOfStaff(this.info?.username).subscribe((param: any) => {
    //          this.httserve.dialongStaffrelSubj.next(param)
    //         console.log(param)
    //        })
    //      })

         
    //  }else{
    //   console.log('')
    //   alert(`Can not apply leaves more than Balanced Leaves. Your Balanced leaves = ${this.info.totalLeaves}`)
    //  }
    // })

  }

}
