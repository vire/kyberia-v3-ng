import { Component, OnInit, OnDestroy }	from '@angular/core';
import { Router, NavigationEnd }				from '@angular/router';
import { KeysPipe } 			from '../filters/keys.pipe';

import { MailService }			from './mail.service';
import { UserService }			from '../services/user.service';

@Component({
	selector: 'mail',
	templateUrl: './mail.component.html',
	styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnDestroy {
	mapUsers = [];
	userMails = [];
	mailToUsername = '';
	mailToUserId = '';
	controller = {};

	constructor(
		private mailService: MailService,
		private userService: UserService,
		private router: Router,
	) {
		if ( !userService.isLoggedIn() ) {
			router.navigate([ '/' ]);
			return;
		}

		this.bindRouteRefresh(this.loadMails);
	}

	showThread = (userName, userId) => {
		this.mailToUsername = userName;
		let user = this.mapUsers[userId];
		this.userMails = user && user.mails;
	}

	goBack = () => {
		this.mailToUsername = '';
	}

	loadMails = () => {
		this.mailService
			.getMails()
			.subscribe(mapUsers => { this.mapUsers = mapUsers; });
	}

	routeSubscription = null;


	/////////////////////////////////////////////////////
	// toto sluzi na to, aby sa refreshovala routa

	ngOnDestroy() {
		this.unsubscribeRouteRefresh();
	}
	bindRouteRefresh(fn) {
		this.routeSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				fn();
			}
		});
	}
	unsubscribeRouteRefresh() {
		if (!this.routeSubscription) return;

		this.routeSubscription.unsubscribe();
		this.routeSubscription = null;
	}

}
