import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FetchApiService } from '../../commom/service/api/fetch-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  roles: any[] = []; // Danh sách vai trò từ API

  constructor(
    private fb: FormBuilder,
    private api: FetchApiService,
    private router: Router
  ) {
    // ✅ Khởi tạo form với các field và validate
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      roleCode: ['', Validators.required] // ✅ Thêm trường chọn role
    }, { validators: this.passwordsMatch });
  }

  ngOnInit(): void {
    // ✅ Khi component load, gọi API lấy danh sách role
    this.loadRoles();
  }

  // ✅ Hàm gọi API backend để lấy danh sách role
  loadRoles() {
    this.api.getRoles().subscribe({
      next: (res: any) => {
        this.roles = res.data || [];
      },
      error: err => {
        console.error('❌ Lỗi khi tải danh sách vai trò:', err);
        this.roles = [];
      }
    });
  }

  // ✅ Custom validator kiểm tra mật khẩu khớp nhau
  passwordsMatch(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  // ✅ Xử lý khi nhấn nút "Đăng ký"
  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMessage = '⚠️ Vui lòng kiểm tra lại thông tin!';
      return;
    }

    const formValue = this.registerForm.value;

    // Payload gửi sang backend
    const payload = {
      userName: formValue.username.trim(),
      email: formValue.email.trim(),
      password: formValue.password,
      roleCode: formValue.roleCode
    };

    this.api.doRegister(payload).subscribe({
      next: res => {
        console.log('✅ Đăng ký thành công:', res);
        alert('🎉 Đăng ký thành công! Hãy đăng nhập.');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('❌ Đăng ký thất bại:', err);
        this.errorMessage = 'Tài khoản đã tồn tại hoặc dữ liệu không hợp lệ!';
      }
    });
  }
}
