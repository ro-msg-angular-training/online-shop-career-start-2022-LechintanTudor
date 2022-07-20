import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  logIn(): void {
    const username = this.loginForm.value.username ?? '';
    const password = this.loginForm.value.password ?? '';
    alert(`Username: ${username}, Password: ${password}`);
  }
}
