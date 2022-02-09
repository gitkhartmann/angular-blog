import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertServices } from '../shared/services/alert.services';

@Component({
	selector: 'app-dashboard-page',
	templateUrl: './dashboard-page.component.html',
	styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

	posts: Post[] = []
	pSub!: Subscription
	dSub!: Subscription
	searchStr!: string

	constructor(
		private postsService: PostsService,
		private alert: AlertServices
	) { }


	ngOnInit(): void {
		this.pSub = this.postsService.getAll()
			.subscribe(posts => this.posts = posts)
	}

	ngOnDestroy() {
		if (this.pSub) {
			this.pSub.unsubscribe()
		}
		if (this.dSub) {
			this.dSub.unsubscribe()
		}
	}

	remove(id: string) {
		this.dSub = this.postsService.remove(id).subscribe(() => {
			this.posts = this.posts.filter(post => post.id !== id)
			this.alert.danger('Пост был удален')

		})

	}


}
