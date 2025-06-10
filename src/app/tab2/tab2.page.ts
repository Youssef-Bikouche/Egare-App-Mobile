import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core'; // Import TranslateService
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  loginForm!: FormGroup; // Corrected variable name
  isErrorMessage:boolean=false
  constructor(private formBuilder: FormBuilder,private translate: TranslateService){} // Inject TranslateService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      code: ['', [Validators.required]], // Using Validators.required for code
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]

    });
   
  }

  checkTicket(): void {
    console.log('clicked')
    console.log(this.loginForm.value);
    if(!this.loginForm.valid){
      this.isErrorMessage=true;
      setTimeout(()=>{
        this.isErrorMessage=false;
      },2000)
    }
  }
}
