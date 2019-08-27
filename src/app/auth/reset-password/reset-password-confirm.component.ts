import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { ResetPasswordService } from "./reset-password.service";
import { Logger } from "../../core/logger.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "mcvod-reset-password-confirm",
  templateUrl: "./reset-password-confirm.html"
})
export class ResetPasswordConfirmComponent implements OnInit {
  public uid: string;
  public token: string;
  public resetPassForm: FormGroup;
  public showPassword: boolean = true;

  constructor(
    @Inject(Router) public router: Router,
    private fb: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private logger: Logger,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    document.body.style.backgroundColor = "#FFFFFF";
    this.route.params.subscribe((params: Params) => {
      this.uid = params["uid"];
      this.token = params["token"];
    });

    this.resetPassForm = this.fb.group({
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ]
    });
  }

  /**
   * Send password reset
   */
  onSubmit(value: any) {
    this.resetPasswordService
      .resetConfirm(this.uid, this.token, value.password)
      .subscribe(
        result => {
          if (result && result.success) {
            this.toastr.success(result.success);
            this.router.navigate(["/reset-password-confirm-success"]);
          }
        },
        error => {
          if (error && error.token && error.token[0]) {
            this.toastr.error("This link has been expired");
          }
        }
      );
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = "#F6F3F9";
  }
}
