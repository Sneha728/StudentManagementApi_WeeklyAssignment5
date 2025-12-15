import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'https://localhost:7123/api/students';

  constructor(private http: HttpClient) {}

  //register
  register(email: string, password: string) {
    return this.http.post<any>(
      'https://localhost:7123/api/auth/register',
      { email, password }
    );
  }

  //login
  login(email: string, password: string) {
    return this.http.post<any>(
      'https://localhost:7123/api/auth/login',
      { email, password }
    );
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  getStudents(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl, this.getAuthHeaders());
}

addStudent(student: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, student, this.getAuthHeaders());
}

updateStudent(student: any): Observable<any> {
  return this.http.put<any>(
    `${this.apiUrl}/${student.id}`,
    student,
    this.getAuthHeaders()
  );
}

deleteStudent(id: number): Observable<any> {
  return this.http.delete<any>(
    `${this.apiUrl}/${id}`,
    this.getAuthHeaders()
  );
}




  
}
