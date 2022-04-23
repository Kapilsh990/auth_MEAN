import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private httpClient: HttpClient
  ) { }

  dataCount :any;
  API_URL: string = 'http://localhost:3000';
  ngOnInit(): void {
    
    this.httpClient.get<any>(`${this.API_URL}/api/profile-data`,)
      .subscribe((res: any) => {
        if(res.status){
          this.dataCount = res.data
        }
      })
  }

}
