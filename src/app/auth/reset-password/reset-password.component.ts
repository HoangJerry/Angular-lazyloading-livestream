import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ResetPasswordService } from "./reset-password.service";
import { Logger } from "../../core/logger.service";
import { EmailValidator } from "../../validators/email-validator";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "mcvod-reset-passowrd",
  templateUrl: "./reset-password.html"
})
export class ResetPasswordComponent implements OnInit {
  public resetForm: FormGroup;

  constructor(
    @Inject(Router) public router: Router,
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private logger: Logger,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.body.style.backgroundColor = "#FFFFFF";
    this.resetForm = this.fb.group({
      email: [
        "",
        Validators.compose([Validators.required, EmailValidator.validate])
      ]
    });
  }

  /**
   * Send password reset
   */
  onSubmit(value: any) {
    this.resetPasswordService.forgotPassword(value.email).subscribe(
      result => {
        if (result && result.success) {
          this.toastr.success(result.success);
          this.resetForm.reset();
        }
      },
      error => {
        if (error && error.email && error.email[0]) {
          this.toastr.error(error.email[0]);
        }
      }
    );
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = "#F6F3F9";
  }
}
