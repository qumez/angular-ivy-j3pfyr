import {
  CdkDragEnd,
  CdkDragMove,
  CdkDragStart,
} from '@angular/cdk/drag-drop/drag-events';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { auditTime, Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'resizeable-panel',
  templateUrl: './resizeable-panel.component.html',
  styleUrls: ['./resizeable-panel.component.css'],
})
export class ResizeablePanelComponent implements AfterViewInit {
  drag$ = new Subject<CdkDragMove>();
  sub = new Subscription();

  @ViewChild('panel') panel: ElementRef;
  topHeight = 0;
  panelHeight = 0;
  currentTopHeight = 0;

  ngAfterViewInit() {
    this.panelHeight = this.panel.nativeElement.clientHeight;
    this.currentTopHeight =
      +window.sessionStorage.getItem('topHeight') ?? this.panelHeight / 2;
    this.topHeight = this.currentTopHeight ?? this.panelHeight / 2;

    this.sub.add(
      this.drag$.subscribe((e: CdkDragMove) => {
        let newTopHeight = this.currentTopHeight + e.distance.y;
        if (newTopHeight < 120 || newTopHeight > this.panelHeight - 120) {
          return;
        }
        this.topHeight = this.currentTopHeight + e.distance.y;
      })
    );
  }

  get remainingHeight() {
    return `${this.panelHeight - this.topHeight - 4}px`;
  }

  handleDrag(e: CdkDragMove) {
    this.drag$.next(e);
  }

  dragEnded(e: CdkDragEnd) {
    this.currentTopHeight = this.topHeight;
    window.sessionStorage.setItem(
      'topHeight',
      this.currentTopHeight.toString()
    );
  }
}
