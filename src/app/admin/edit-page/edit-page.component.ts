import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertServices } from '../shared/services/alert.services';

@Component({
	selector: 'app-edit-page',
	templateUrl: './edit-page.component.html',
	styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

	form!: FormGroup
	post!: Post
	submitted: boolean = false
	uSub!: Subscription

	constructor(
		private route: ActivatedRoute,
		private postsServise: PostsService,
		private alert: AlertServices
		//private router: Router
	) { }


	ngOnInit() {
		this.route.params.pipe(
			switchMap((params: Params) => {
				return this.postsServise.getById(params['id'])
			})
		).subscribe((post: Post) => {
			this.post = post
			this.form = new FormGroup({
				title: new FormControl(post.title, Validators.required),
				text: new FormControl(post.text, Validators.required)
			})
		})
	}

	ngOnDestroy() {
		if (this.uSub) {
			this.uSub.unsubscribe()
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

	submit() {
		if (this.form.invalid) {
			return
		}
		this.submitted = true
		this.uSub = this.postsServise.update({
			...this.post,
			text: this.form.value.text,
			title: this.form.value.title
		}).subscribe(() => {
			this.submitted = false
			this.alert.succes('Пост был обновлен')
			//this.router.navigate(['/admin', 'dashboard'])
		})
	}

}
