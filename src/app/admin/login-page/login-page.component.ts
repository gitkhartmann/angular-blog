import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
	form!: FormGroup
	constructor() { }

	ngOnInit(): void {
		this.form = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
			password: new FormControl(null, [Validators.required, Validators.minLength(6)])
		})
	}
	submit() {
		if (this.form.invalid) {
			return
		}
	}
	isErrors(fieldName: string, errorName: string): boolean {
		if (!this.form.get(fieldName)?.errors) {
			return false
		}
		if (this.form.get(fieldName)?.errors?.[errorName]) {
			return true
		}
		return false
	}
	isInvalid(fieldName: string): boolean {
		return this.form.get(fieldName)!.touched && this.form.get(fieldName)!.invalid
	}
}