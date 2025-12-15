import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; 
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],   
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  email = signal('');
  password = signal('');
  message = signal('');
  error = signal('');

  constructor(
    private service: StudentService,
    private router: Router
  ) {}

  register() {
  this.service.register(this.email(), this.password()).subscribe({
    next: (res) => {
      
      this.message.set(res.text ?? 'Registration successful. Please login.');
      this.error.set('');

      // redirect to login
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);
    },
    error: (err) => {
      console.error('Registration failed:', err);

      if (err.error?.length > 0) {
        this.error.set(err.error[0].description);
      } else if (err.error?.text) {
        this.error.set(err.error.text);
      } else {
        this.error.set('Registration failed');
      }

      this.message.set('');
    }
  });
}
}

