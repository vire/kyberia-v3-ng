import { Component, OnInit } from '@angular/core';
import { Router }				from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {

	user = null;
	username = localStorage.getItem('lastLoginUsername') || 'ubik';
	password = '...';
	error = '';

	constructor(
		public userService: UserService,
		public router: Router,
	) { }

	login(): void {
		this.userService
			.login(this.username, this.password)
			.subscribe( this.onLogin, this.onLogin );
	}

	onLogin = (json) => {
		if (!json.success) {
			this.error = 'nepodarilo sa mi prihlasit :\'(';
			return;
		}

		localStorage.setItem('lastLoginUsername', this.username);
		this.user = json;
		this.error = '';

		this.router.navigate([ '/' ]);
	}

}