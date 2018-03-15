import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-hd',
  templateUrl: './hd.component.html',
  styleUrls: ['./hd.component.css']
})
export class HdComponent implements OnInit {
  user:any = {};
  constructor(private router:Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
  }

  onLogout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}


