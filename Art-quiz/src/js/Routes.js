import { HomeComponent } from "./Components/HomeComponent";
import { CategoryComponent } from "./Components/CategoryComponent";
import { QuizPage } from "./Components/QuizPage";
import { TimerComponent } from "./Components/TimerComponent";
import { CheckAnswerComponent } from "./Components/CheckAnswerComponent"
import { QuizResultPage } from "./Components/QuizResultPage"
import { ExitConfirmComponent } from "./Components/ExitConfirmComponent";
import { LearnPictureComponent } from "./Components/LearnPictureComponent";
import { ScoreComponent } from "./Components/ScoreComponent";
import { ScoreWarningComponent } from "./Components/ScoreWarningComponent";
import { SettingsComponent } from "./Components/SettingsComponent";


// Routes 
const routes = [
  { path: '/', component: HomeComponent, },
  { path: '/modal/settings', component: SettingsComponent, },
  { path: '/category', component: CategoryComponent, },
  { path: '/category/quiz', component: QuizPage, },
  { path: '/category/quiz/header-timer', component: TimerComponent, },
  { path: '/modal/answer', component: CheckAnswerComponent, },
  { path: '/modal/result-quiz', component: QuizResultPage, },
  { path: '/modal/confirm-exit', component: ExitConfirmComponent, },
  { path: '/modal/learn-picture', component: LearnPictureComponent, },
  { path: '/modal/cancel', component: {render: () => {''}}, }, 
  { path: '/modal/score-warning', component: ScoreWarningComponent, }, 
  { path: '/score', component: ScoreComponent, },
];

export {routes};


