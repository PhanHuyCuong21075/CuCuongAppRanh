import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FetchApiService } from '../../commom/service/api/fetch-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './login.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private api: FetchApiService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  // Hàm kiểm tra khớp mật khẩu
  passwordsMatch(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Vui lòng kiểm tra lại thông tin!';
      return;
    }

    this.api.doRegister(this.registerForm.value).subscribe({
      next: res => {
        console.log('Đăng ký thành công:', res);
        alert('Đăng ký thành công! Hãy đăng nhập.');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Đăng ký thất bại:', err);
        this.errorMessage = 'Tài khoản đã tồn tại hoặc dữ liệu không hợp lệ!';
      }
    });
  }
}
