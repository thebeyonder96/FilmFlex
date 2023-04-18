import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  Form!:FormGroup;
  loginSuccess=false;
  loginError=false;
  loginMessage:string=''

  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router,private toastr:ToastrService){
    this.Form = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
  })

  }

  onSubmit(){
    const { username ,password} = this.Form.value;
    this.auth.login(username,password).subscribe({
      next: (res)=> {
        this.toastr.success('Success','Login Successful')
        let data = JSON.stringify(res);
        let JsonData = JSON.parse(data);
        // console.log(JsonData.firstName);
        localStorage.setItem('logUser',JsonData.firstName);
        this.router.navigate(['/home',res])
      },
      error: err => {
        this.toastr.error(err.error.message)
      }
    })
  }

  close(){
    this.loginSuccess = false;
    this.loginError = false;
  }
}


