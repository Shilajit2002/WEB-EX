import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './services/auth.interceptor';

/* -------------------------- Angular Material Imports -------------------------- */

// Import Button Material API
import { MatButtonModule } from '@angular/material/button';
// Import Input Material API
import { MatInputModule } from '@angular/material/input';
// Import FormField
import { MatFormFieldModule } from '@angular/material/form-field';
// Import Matsnackbar for alert
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Import Angular Icon
import { MatIconModule } from '@angular/material/icon';
// Import Angular List
import { MatListModule } from '@angular/material/list';
// Import MatCard Module
import { MatCardModule } from '@angular/material/card';
// Import SlideToggle Module
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Import Select Module
import { MatSelectModule } from '@angular/material/select';
// Import Form Module
import { FormsModule } from '@angular/forms';
// Import HttpClient Module
import { HttpClientModule } from '@angular/common/http';
//  Import NgxMaskModule
import { NgxMaskModule } from 'ngx-mask';
// Import MatToolBar Module
import { MatToolbarModule } from '@angular/material/toolbar';
//  Import CkEditor Module
import { CKEditorModule } from 'ng2-ckeditor';
//  Import Flex Layout Model
import { FlexLayoutModule } from '@angular/flex-layout';
// Import MatRadio Module
import {MatRadioModule} from '@angular/material/radio'; 
// Import Webcam Module
import {WebcamModule} from 'ngx-webcam';
// Import MatProgress Spinner
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// Import Ngx Ui Loader
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
// Import MatCheckBox Module
import {MatCheckboxModule} from '@angular/material/checkbox'; 

/* -------------------------- Landing Page Imports -------------------------- */

//  Navbar
import { NavbarComponent } from './components/navbar/navbar.component';
//  Footer
import { FooterComponent } from './components/footer/footer.component';
//  SignUp
import { SignupComponent } from './pages/signup/signup.component';
//  Login
import { LoginComponent } from './pages/login/login.component';
// Home
import { HomeComponent } from './pages/home/home.component';

/* -------------------------- Profile Page Imports -------------------------- */

//  Profile for Admin & User
import { ProfileComponent } from './components/profile/profile.component';

/* -------------------------- Admin Page Imports -------------------------- */

//  Admin Dashboard
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

//  Admin Welcome
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
//  Admin SideBar
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';

//  Admin View Category
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
//  Admin Add Category
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
//  Admin Update Category
import { UpdateCategoryComponent } from './components/admin/update-category/update-category.component';

//  Admin View Quiz
import { ViewQuizzesComponent } from './components/admin/view-quizzes/view-quizzes.component';
//  Admin Add Quiz
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
//  Admin Update Quiz
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';

//  Admin View Question
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
//  Admin Add Question
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
//  Admin Update Question
import { UpdateQuestionComponent } from './components/admin/update-question/update-question.component';

/* -------------------------- User Page Imports -------------------------- */

//  User Dashboard
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';

//  User Welcome
import { UserWelcomeComponent } from './components/user/user-welcome/user-welcome.component';
//  User Sidebar
import { UserSidebarComponent } from './components/user/user-sidebar/user-sidebar.component';
import { ViewPyqComponent } from './components/user/view-pyq/view-pyq.component';
import { LoadCategoryComponent } from './components/user/load-category/load-category.component';
import { LoadQuizComponent } from './components/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';
import { StartComponent } from './components/user/start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    UserSidebarComponent,
    UserWelcomeComponent,
    ViewCategoriesComponent,
    AddCategoryComponent,
    ViewQuizzesComponent,
    AddQuizComponent,
    UpdateQuizComponent,
    UpdateCategoryComponent,
    ViewQuizQuestionsComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    ViewPyqComponent,
    LoadCategoryComponent,
    LoadQuizComponent,
    InstructionsComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Add MatButtonModule for Button Material
    MatButtonModule,
    // Add MatInputModule for Input Material
    MatInputModule,
    // Add MatFormModule for FormField Material
    MatFormFieldModule,
    // Add FormsModule
    FormsModule,
    // Add HTTP CLient Module for backend
    HttpClientModule,
    // Add Matsnackbar for alert
    MatSnackBarModule,
    // Add matIconmodule
    MatIconModule,
    // Add NgxMaskModule
    NgxMaskModule.forRoot(),
    // Add MatToolBar
    MatToolbarModule,
    //  Add FlexLayout Model
    FlexLayoutModule,
    // Add MatList Module
    MatListModule,
    // Add MatCard Module
    MatCardModule,
    // Add matSlideToggle Module
    MatSlideToggleModule,
    // Add MatSelect Module
    MatSelectModule,
    //  CkEditor Module
    CKEditorModule,
    // MatRadio Module
    MatRadioModule,
    // Webcam Module
    WebcamModule,
    // MatProgress Spinner
    MatProgressSpinnerModule,
    // Loader NGX
    NgxUiLoaderModule,
    // Loader Http
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    // Mat CheckBox Module
    MatCheckboxModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
