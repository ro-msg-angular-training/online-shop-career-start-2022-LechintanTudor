import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm = this.fb.nonNullable.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required),
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logIn(): void {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';

    this.authService
      .login(username, password)
      .pipe(take(1))
      .subscribe({
        next: () => {
          const redirectUrl = this.authService.redirectUrl ?? '/products';
          this.router.navigateByUrl(redirectUrl);
        },
        error: () => {
          alert('Failed to log in!');
        },
      });
  }
}
