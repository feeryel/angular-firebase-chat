import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup
  bsModalRef: BsModalRef;

  constructor(private authService: AuthService, private modalService: BsModalService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .catch(error => {
        this.showModal(error);
      });
  }

  isInvalid(field: string) {
    switch (field) {
      case 'email':
        return this.loginForm.get('email').touched && this.loginForm.get('email').invalid;
      case 'password':
        return this.loginForm.get('password').touched && this.loginForm.get('password').invalid;
    }
  }

  showModal(error) {
    const initialState = {
      message: error.message,
      title: 'Incorrect credentials.'
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}