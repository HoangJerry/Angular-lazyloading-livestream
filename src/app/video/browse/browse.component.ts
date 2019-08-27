import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { APP_NAME, LOGO_COLOR } from "../../app.constants";
import { VideoService } from "../video.service";
import { HistoryService } from "../../account/history/history.service";
import { WidthService } from "../../core/width.service";
import { AccountService } from "../../account/account.service";
import { Modal } from "ngx-modal";
import { Logger } from "../../core/logger.service";
import { ToastrService } from "ngx-toastr";
import { SignupService } from "../../auth/signup/signup.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EqualPasswordsValidator } from "../../validators/equal-password.validator";
import { EmailValidator } from "../../validators/email-validator";
import { Location } from "@angular/common";

@Component({
  selector: "mcvod-browse",
  templateUrl: "./browse.html"
})
export class BrowseComponent implements OnInit {
  public appName: string;
  public newVideos: any[];
  public popularVideos: any[];
  public popularTVShows: any[];
  public history: any[];
  public genreVideos: any[];
  public genreTVShows: any[];
  public errorMessage: any[];
  public slides: any[];
  public featuredVideos: any[];
  public viewAllPopularMovies: boolean;
  public viewAllPopularShows: boolean;
  public viewAllRecentMovies: boolean;
  public all: any;
  public showAddAddress: boolean;
  public passValid: boolean = false;
  public showPassword: boolean = false;
  public showRePassword: boolean = false;
  public firstNamePasswordAreSame: boolean = false;
  public user: any;
  public setPasswordForm: FormGroup;
  @ViewChild("verifyYourEmail") verifyYourEmail: Modal;
  @ViewChild("setPassword") setPassword: Modal;

  constructor(
    @Inject(Router) public router: Router,
    private videoService: VideoService,
    private historyService: HistoryService,
    public widthService: WidthService,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private logger: Logger,
    private toastr: ToastrService,
    private signupService: SignupService,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.appName = APP_NAME;
    this.slides = [];
    this.viewAllPopularMovies = false;
    this.viewAllPopularShows = false;
    this.viewAllRecentMovies = false;

    this.route.params.subscribe((params: Params) => {
      if (params["all"]) {
        this.all = params["all"];
      }
    });
  }

  ngOnInit(): void {
    this.getNewVideos();
    this.getPopularVideos();
    this.getPopularTVShows();
    this.getViewingHistory();
    this.getGenreVideos();
    this.getGenreTVShows();
    this.getFeaturedVideos();
    this.getLoggedUser();
    this.setPasswordFormMethod();
    if (
      localStorage.getItem("signUpFlow") &&
      JSON.parse(localStorage.getItem("signUpFlow"))
    ) {
      this.verifyModal();
    }
    if (
      this.route.snapshot.params["uid"] &&
      this.route.snapshot.params["token"]
    ) {
      this.setPasswordModal();
    }
  }

  /**
   * To open a modal popup for verify the email address
   */
  verifyModal() {
    this.verifyYourEmail.open();
  }

  /**
   * To open a modal popup for set the password
   */
  setPasswordModal() {
    this.setPassword.open();
  }

  /**
   * Initialize the set passowrd form
   */
  setPasswordFormMethod() {
    this.setPasswordForm = this.fb.group({
      userEmail: [
        localStorage.getItem("user_email"),
        Validators.compose([Validators.required, EmailValidator.validate])
      ],
      firstName: ["", Validators.compose([Validators.required])],
      passwords: this.fb.group(
        {
          password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(8)])
          ],
          confirm_password: [
            "",
            Validators.compose([Validators.required, Validators.minLength(8)])
          ]
        },
        {
          validator: EqualPasswordsValidator.validate(
            "password",
            "confirm_password"
          )
        }
      )
    });
  }

  /**
   * verification mail
   */
  verifyEmail() {
    this.signupService
      .resendVerificationMail(localStorage.getItem("user_email"))
      .subscribe(
        result => {
          this.toastr.success(
            "Please check your email for a verification email from us do-not-reply@corco.com"
          );
        },
        error => {
          if (error && error.non_field_errors && error.non_field_errors[0]) {
            this.toastr.error(error.non_field_errors[0]);
          }
        }
      );
  }

  /**
   * Get logged in user from local storage
   */
  getLoggedUser() {
    let user_profile = localStorage.getItem("user_profile");
    this.accountService.assignUser(user_profile);
  }

  //DELETE
  // /**
  //  * Get logged in user
  //  */
  // getLoggedUser() {
  //   this.accountService.getLoggedUser().subscribe(
  //     user => {
  //       this.user = user;
  //       this.accountService.assignUser(user);
  //     },
  //     error => {
  //       this.errorMessage = error;
  //     }
  //   );
  // }

  /**
   * View all movies
   */
  viewAllMovies() {
    this.router.navigate(["/browse", "popularVideos"]);

    return true;
  }

  /**
   * View all shows
   */
  viewAllShows() {
    this.router.navigate(["/browse", "popularTVShows"]);

    return true;
  }

  /**
   * View all recent
   */
  viewAllRecent() {
    this.router.navigate(["/browse", "recent"]);

    return true;
  }

  viewAll(genre) {
    this.router.navigate(["/browse", genre.genre]);

    return true;
  }

  showViewAll(numberOfItems: number) {
    if (
      (numberOfItems > 12 && this.widthService.width > 768) ||
      (numberOfItems > 8 &&
        this.widthService.width > 360 &&
        this.widthService.width <= 768) ||
      (numberOfItems > 4 && this.widthService.width <= 360)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Go to video page
   */
  gotoVideo(videoId: string) {
    this.router.navigate(["/video", videoId]);
    return false;
  }

  /**
   * Go to tv show page
   */
  gotoShow(videoId: string) {
    this.router.navigate(["/tvshow", videoId]);
    return false;
  }

  /**
   * Get list of new videos
   */
  getNewVideos() {
    this.videoService.getNewVideos().subscribe(
      // videos => (this.newVideos[0]["title"]),
      videos => (this.newVideos = videos),
      error => (this.errorMessage = <any>error)
    );
  }

  /**
   * Get list of featured videos
   */
  getPopularVideos() {
    this.videoService
      .getPopularVideos()
      .subscribe(
        videos => (this.popularVideos = videos),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Get list of featured tv shows
   */
  getPopularTVShows() {
    this.videoService
      .getPopularTVShows()
      .subscribe(
        videos => (this.popularTVShows = videos),
        error => (this.errorMessage = <any>error)
      );
  }

  /**
   * Get viewing history
   */
  getViewingHistory() {
    this.historyService.getViewingHistory().subscribe(
      result => {
        this.history = [];
        let temp = [];
        for (let i = result.length - 1; i >= 0; i--) {
          if (result[i].videoID.tvShow) {
            if (temp.indexOf(result[i].videoID.tvShow.TvShowID) == -1) {
              temp.push(result[i].videoID.tvShow.TvShowID);
              this.history.push(result[i]);
            } else {
            }
          } else {
            this.history.push(result[i]);
          }
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  /**
   * Get list of genre videos
   */
  getGenreVideos() {
    this.videoService.getGenreVideos().subscribe(
      videos => {
        this.genreVideos = videos;
        for (let i = 0; i < this.genreVideos.length; i++) {
          this.genreVideos[i].active = false;
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  /**
   * Get list of genre tv shows
   */
  getGenreTVShows() {
    this.videoService.getGenreTVShows().subscribe(
      videos => {
        this.genreTVShows = videos;
        for (let i = 0; i < this.genreTVShows.length; i++) {
          this.genreTVShows[i].active = false;
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  /**
   * Get list of featured videos
   */
  getFeaturedVideos() {
    this.videoService.getFeaturedVideos().subscribe(
      videos => {
        this.featuredVideos = videos;
        for (let i = 0; i < videos.length; ++i) {
          if (i == 6) break;
          this.slides.push({
            img: videos[i].featureImageLink,
            title: videos[i].title,
            index: i,
            active: i == 0 ? true : false,
            videoID: videos[i].videoID
          });
        }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  private groupData(data: any[], limit: number) {
    let groupedData = [];
    let temp = [];
    let numberItem = limit;
    if (data) {
      for (let i = 0; i < data.length; ++i) {
        if (i < numberItem) {
          temp.push(data[i]);
        } else {
          numberItem += limit;
          groupedData.push({
            videos: temp,
            active: false
          });
          temp = [];
          temp.push(data[i]);
        }
      }

      if (temp.length > 0) {
        groupedData.push({
          videos: temp,
          active: false
        });
      }
    }

    return groupedData;
  }

  /**
   * When user clicks on the start watching button
   */
  startWatching() {
    localStorage.removeItem("signUpFlow");
    this.verifyYourEmail.close();
  }

  /**
   * Check the password validation whether it is letter mix or not
   */
  passwordValidation(event) {
    this.passValid = false;
    if (/[a-zA-Z]/.test(event.target.value)) {
      this.passValid = true;
    }
  }

  /**
   * To match the first name and the password field
   */
  userNamePassMatch() {
    if (this.passValid) {
      this.firstNamePasswordAreSame = false;
      if (
        this.setPasswordForm.get("firstName").value ===
        this.setPasswordForm.get("passwords").get("password").value
      ) {
        this.firstNamePasswordAreSame = true;
      }
    }
  }

  /**
   * Submit button (lets go!)
   */
  onSubmit(values) {
    let data = {
      password: values.passwords.password,
      confirm_password: values.passwords.confirm_password,
      uid: this.route.snapshot.params["uid"],
      token: this.route.snapshot.params["token"]
    };
    this.accountService.verifyAccountService(data).subscribe(
      result => {
        if (result && result.success) {
          this.toastr.success(
            "Email has been verified. Password set successfully"
          );
          this.setPassword.close();
          this.location.replaceState("browse");
        }
      },
      error => {
        if (error && error.token && error.token[0]) {
          this.toastr.error("Invalid link or this link has been expired");
          this.setPassword.close();
          this.location.replaceState("browse");
        }
      }
    );
  }
}
