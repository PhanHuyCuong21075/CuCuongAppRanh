import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FetchApiService} from '../../commom/service/api/fetch-api.service';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private api: FetchApiService) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  onLogin() {
    if (this.loginForm.valid) {
      this.api.doLogin(this.loginForm.value).subscribe({
        next: res => {
          console.log('Đăng nhập thành công:', res);
          // ✅ Lưu token và username
          localStorage.setItem('token', res.token);
          localStorage.setItem('username', res.username);
          // ✅ Chuyển hướng sang trang chính
          window.location.href = '/home'; // hoặc dùng Router
        },
        error: err => {
          console.error('Đăng nhập thất bại:', err);
          alert('Sai tên đăng nhập hoặc mật khẩu');
        }
      });
    }
  }


}
