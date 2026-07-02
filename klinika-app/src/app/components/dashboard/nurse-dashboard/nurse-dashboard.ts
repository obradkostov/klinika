import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nurses } from '../../../services/nurses';

@Component({
  selector: 'app-nurse-dashboard',
  imports: [CommonModule],
  templateUrl: './nurse-dashboard.html',
  styleUrl: './nurse-dashboard.css',
})
export class NurseDashboard implements OnInit {
  fullName = '';
  userName = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private nursesService: Nurses,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit() {
    const user = this.authService.getUserFromToken();
    this.userName = user?.email || '';
    if (user) {
      this.nursesService.getByUserId(user.sub).subscribe({
        next: (nurse) => {
          if (nurse) {
            this.fullName = nurse.firstName + ' ' + nurse.lastName;
            this.cdr.markForCheck();
          }
        },
        error: (err) => console.error(err)

      })
    }
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
