import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  isLoading = false;
  isEditEnabled = false;
  public hidePassword = true;
  public hideValidPassword = true;

  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', []),
    validPassword: new FormControl('', []),
    phone: new FormControl('', [Validators.required]),
    documentId: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required])
  });
  public validationMessages = {
    name: [],
    email: [],
    password: [],
    validPassword: [],
    phone: [],
    documentId: [],
    birthday: []
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getSignedInUser().subscribe((user) => {
      console.log(user);
      this.accountForm.get('name').setValue(user.full_name);
      this.accountForm.get('email').setValue(user.email);
      this.accountForm.get('phone').setValue(user.phone);
      this.accountForm.get('documentId').setValue(user.cedula);
      this.accountForm.get('birthday').setValue(user.birthday);
    }, error => {
      console.log(error);
    })
  }

}
