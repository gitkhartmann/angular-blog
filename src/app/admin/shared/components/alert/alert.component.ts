import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertServices } from '../../services/alert.services';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

	@Input() delay = 5000

	public text!: string
	public type = 'succes'
	aSub!: Subscription

	constructor(private alertService: AlertServices) { }


	ngOnInit(): void {
		this.aSub = this.alertService.alert$.subscribe(alert => {
			this.text = alert.text
			this.type = alert.type

			const timeOut = setTimeout(() => {
				clearTimeout(timeOut)
				this.text = ''
			}, this.delay);
		})
	}

	ngOnDestroy(): void {
		if (this.aSub) {
			this.aSub.unsubscribe()
		}
	}

}
