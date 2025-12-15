import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],    
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = signal('');
  password = signal('');
  error = signal('');

  constructor(
    private service: StudentService,
    private router: Router
  ) {}

  login() {
    this.service.login(this.username(), this.password()).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);

        
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error.set('Invalid credentials');
      }
    });
  }
}
