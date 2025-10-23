import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggested-friend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggested-friend.component.html',
  styleUrls: ['./suggested-friend.component.css']
})
export class SuggestedFriendComponent {
  @Input() suggestedFriends: any[] = [];
}
