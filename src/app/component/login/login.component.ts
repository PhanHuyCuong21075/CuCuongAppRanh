import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FetchApiService } from '../../commom/service/api/fetch-api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private api: FetchApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const payload = {
      userName: this.loginForm.value.username, // ✅ đúng với AuthRequest bên BE
      password: this.loginForm.value.password
    };

    this.api.doLogin(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log('Đăng nhập thành công:', res);

        if (res && res.data && res.data.token) {
          const { token, username, roles } = res.data;

          // ✅ Lưu token và thông tin người dùng
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          localStorage.setItem('roles', JSON.stringify(roles));

          // ✅ Điều hướng không reload
          this.router.navigate(['/home']);
        } else {
          alert('Phản hồi không hợp lệ từ máy chủ.');
        }
      },
      error: err => {
        this.isLoading = false;
        console.error('Đăng nhập thất bại:', err);
        const message =
          err?.error?.message || 'Sai tên đăng nhập hoặc mật khẩu';
        alert(message);
      }
    });
  }
}
