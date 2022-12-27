import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddQuestionComponent } from './components/admin/add-question/add-question.component';
import { AddQuizComponent } from './components/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UpdateCategoryComponent } from './components/admin/update-category/update-category.component';
import { UpdateQuestionComponent } from './components/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './components/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewQuizQuestionsComponent } from './components/admin/view-quiz-questions/view-quiz-questions.component';
import { ViewQuizzesComponent } from './components/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './components/admin/welcome/welcome.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InstructionsComponent } from './components/user/instructions/instructions.component';
import { LoadCategoryComponent } from './components/user/load-category/load-category.component';
import { LoadQuizComponent } from './components/user/load-quiz/load-quiz.component';
import { StartComponent } from './components/user/start/start.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserWelcomeComponent } from './components/user/user-welcome/user-welcome.component';
import { ViewPyqComponent } from './components/user/view-pyq/view-pyq.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
  // Home URL Component
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  // Signup URL Component
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  // Login URL Component
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  //  Admin URL Component
  {
    path: 'admin',
    component: DashboardComponent,
    // Guard for protect the Route
    canActivate: [AdminGuard],

    children: [
      // Admin Welcome Component
      {
        path: '',
        component: WelcomeComponent,
      },

      // Admin Profile Component
      {
        path: 'profile',
        component: ProfileComponent,
      },

      //  Admin View Categories Component
      {
        path: 'categories',
        component: ViewCategoriesComponent,
      },

      //  Admin Add Categories Component
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },

      //  Admin Update Categories Component
      {
        path: 'category/:cid',
        component: UpdateCategoryComponent,
      },

      //  Admin View Quizzes Component
      {
        path: 'quizzes',
        component: ViewQuizzesComponent,
      },

      //  Admin Add Quizzes Component
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },

      //  Admin Update Quizzes Component
      {
        path: 'quiz/:qid',
        component: UpdateQuizComponent,
      },

      //  Admin View Quizzes Questions Component
      {
        path: 'view-questions/:qid/:title',
        component: ViewQuizQuestionsComponent,
      },

      //  Admin Add Questions Component
      {
        path: 'add-question/:qid/:title',
        component: AddQuestionComponent,
      },

      //  Admin Update Questions Component
      {
        path: 'update-question/:qid/:title/:quesId',
        component: UpdateQuestionComponent,
      },
    ],
  },
  //  User URL Component
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    // Guard for protect the Route
    canActivate: [NormalGuard],
    children: [
      // User Welcome Component
      {
        path: '',
        component: UserWelcomeComponent,
      },

      // User Profile Component
      {
        path: 'profile',
        component: ProfileComponent,
      },

      // User View PYQ Component
      {
        path: 'view-pyq',
        component: ViewPyqComponent,
      },

      // User Load Category Component
      {
        path: 'view-subject',
        component: LoadCategoryComponent,
      },

      // User Load Quiz Component
      {
        path: 'view-paper/:cid',
        component: LoadQuizComponent,
      },

      // User Quiz Instructions Component
      {
        path: 'instructions/:qid',
        component: InstructionsComponent,
      },
    ],
  },
  // Start Exam Component
  {
    path: 'start/:qid',
    component: StartComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
