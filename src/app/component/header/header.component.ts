import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // ✅ Dùng getter
  public get username(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login';
  }

}
