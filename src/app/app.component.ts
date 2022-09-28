import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {CustomValidators} from './custom-validators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signupForm: FormGroup;
  statusTypes = ['Stable', 'Critical', 'Finished'];
  formData = {
    'projectName': '',
    'email': '',
    'status': '',
  };
  submitted = false;

  constructor(private emailValidator: CustomValidators) {
  }

  // forbiddenProjectNames =  ['Test'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'projectName': new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.invalidProjectName]),
      'email': new FormControl(null,
        [
          Validators.required,
          Validators.email],
        [CustomValidators.forbiddenEmails]),
      'status': new FormControl('Stable')
    });
  }

  onSubmit() {
    this.submitted = true;
    this.formData.projectName = this.signupForm.value.projectName;
    this.formData.email = this.signupForm.value.email;
    this.formData.status = this.signupForm.value.status;
    this.signupForm.reset();
    console.log(this.signupForm);
  }

  // forbiddenNames(control: FormControl): { [s: string]: boolean } {
  //   if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
  //     return {'projectNameIsForbidden': true};
  //   }
  //   return null;
  // }

  // forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
  //   const promise = new Promise<any>((resolve, reject) => {
  //     setTimeout(() => {
  //       if (control.value === 'test@test.com') {
  //         resolve({'emailIsForbidden': true});
  //       } else {
  //         resolve(null);
  //       }
  //     }, 2000);
  //   });
  //   return promise;
  // }
}
