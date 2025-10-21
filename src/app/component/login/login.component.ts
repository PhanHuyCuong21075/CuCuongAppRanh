import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FetchApiService} from '../../commom/service/api/fetch-api.service';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

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
              private api: FetchApiService,
              private router: Router) {

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
          const userData = res.data; // 👈 lấy data đúng

          // ✅ Lưu token và username, role
          localStorage.setItem('token', userData.token);
          localStorage.setItem('username', userData.username);
          localStorage.setItem('role', userData.role);

          // ✅ Dùng Router để điều hướng, không reload
          this.router.navigate(['/home']);
        },
        error: err => {
          console.error('Đăng nhập thất bại:', err);
          alert('Sai tên đăng nhập hoặc mật khẩu');
        }
      });
    }
  }
}
