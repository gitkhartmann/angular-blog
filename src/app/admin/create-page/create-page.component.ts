import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertServices } from '../shared/services/alert.services';

@Component({
	selector: 'app-create-page',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
	form!: FormGroup
	constructor(
		private postsService: PostsService,
		private alert: AlertServices
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			title: new FormControl(null, Validators.required),
			text: new FormControl(null, Validators.required),
			author: new FormControl(null, Validators.required)
		})
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

	submit() {
		if (this.form.invalid) {
			return
		}
		const post: Post = {
			title: this.form.value.title,
			text: this.form.value.text,
			author: this.form.value.author,
			date: new Date()
		}
		this.postsService.create(post).subscribe(() => {
			this.form.reset()
			this.alert.succes('Пост был создан')
		})
	}

}
