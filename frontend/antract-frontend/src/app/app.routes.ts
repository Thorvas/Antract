import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { LessonsComponent } from './lessons/lessons.component';
import { TabsComponent } from './tabs/tabs.component';
import { VisualLessonsComponent } from './visual-lessons/visual-lessons.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'instruments', component: InstrumentsComponent},
    {path: 'lessons', component: LessonsComponent},
    {path: 'lessons/visual', component: VisualLessonsComponent},
    {path: 'tabs', component: TabsComponent}
];
