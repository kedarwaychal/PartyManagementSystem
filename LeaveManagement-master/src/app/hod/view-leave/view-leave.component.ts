import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../api.service';
import { HttphandlerService } from '../../shared/http-handler.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddstaffComponent } from '../addstaff/addstaff.component';
import { CreatepartyComponent } from '../createparty/createparty.component';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent implements OnInit {

  department = localStorage.getItem('dept');
  username = localStorage.getItem('username');
  leaveArr = [];
  staffarr: any;
  searchTerm: string = '';
  members: any[] = [];
  defaultPageSize: number = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) sort!: MatSort;


  displayedColumns: string[] = ['Employeeid', 'username', 'Email', 'action'];
  dataSource!: MatTableDataSource<any>;

  constructor(private api: ApiService, private httpserve: HttphandlerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getdata();
    this.getdatailsstaff();
    this.httpserve.hoddetails.subscribe((param: any) => {
      this.members = param;
      this.dataSource = new MatTableDataSource(this.members);
      console.log(this.members)
    })
    this.httpserve.gethodstaffdet(this.department).subscribe((param: any) => {
      this.members = param;
      this.dataSource = new MatTableDataSource(this.members);
      this.dataSource.paginator = this.paginator;
      console.log(this.members)
    });
    // this.getprtyindetails()
    
  }

  openDialog(element: any) {
    console.log(element)
    this.dialog.open(CreatepartyComponent,{
      width:'500px',
      height:'500px',
      data:{...element}
    });

  }

  getdata() {
    this.httpserve.getleavedataofhod(this.department).subscribe((params: any) => {
      console.log(params)
    })
  }
  deleteuser(id: number) {
    console.log(id)
    this.httpserve.deleteuser(id).subscribe((res) => {
      alert('Do you want to delete this user');
      this.getdatailsstaff();
    })
  }

  editUser(id:number){
    
  }

  

  patchuser(id:number,obj:any){
    this.httpserve.patchUser(id,obj).subscribe((res)=>{
      alert('Do You want to edit this user');
    })
  }

  getdatailsstaff() {
    this.httpserve.gethodstaffdet(this.department).subscribe((param: any) => {
      this.members = param;
      this.dataSource = new MatTableDataSource(this.members);
      this.dataSource.paginator = this.paginator;
      console.log(this.members)
    });
  }

  // getprtyindetails(){
  //   this.httpserve.getPartyindet(this.username).subscribe((param:any)=>{
  //     this.members = param;
  //     this.dataSource = new MatTableDataSource(this.members);
  //     this.dataSource.paginator = this.paginator;
  //     console.log(this.members)
  //   })
  // }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // search() {
  //    this.members =  this.members.filter((member:any) =>{
  //     return member.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   });
  // }
}
