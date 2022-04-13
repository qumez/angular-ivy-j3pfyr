import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ResizeablePanelComponent } from './resizeable-panel.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [BrowserModule, FormsModule, DragDropModule],
  declarations: [AppComponent, HelloComponent, ResizeablePanelComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
