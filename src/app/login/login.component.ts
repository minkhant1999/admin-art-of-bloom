import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  error = ''
  formGroup!: FormGroup

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submitLogin() {
    this.error = ""
    if (!this.formGroup.valid) {
      this.error = 'Email and password is required'
      return
    }
    signInWithEmailAndPassword(
      getAuth(),
      this.formGroup.value.email,
      this.formGroup.value.password
    ).then(() => {
      this.router.navigate(['/'])
    }).catch((err) => {
      this.error = err.message
    })

  }
}
