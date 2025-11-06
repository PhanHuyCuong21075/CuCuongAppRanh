import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FetchApiService } from '../../commom/service/api/fetch-api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DialogService } from '../../commom/dialog.service';

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
    private router: Router,
    private dialog: DialogService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.dialog.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    this.isLoading = true;
    const payload = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.api.doLogin(payload).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        console.log('Đăng nhập thành công:', res);

        if (res && res.data && res.data.token) {

          const { token, username, roles } = res.data;

          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          localStorage.setItem('roles', JSON.stringify(roles));

          this.dialog.success("Đăng nhập thành công!");

          this.router.navigate(['/home']);

        } else {
          this.dialog.warning('Phản hồi không hợp lệ từ máy chủ.');
        }
      },
      error: err => {
        this.isLoading = false;
        console.error('Đăng nhập thất bại:', err);

        const message =
          err?.error?.message || 'Sai tên đăng nhập hoặc mật khẩu';

        this.dialog.error(message);
      }
    });
  }
}
