import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSpinner } from '@angular/material/progress-spinner';

@Injectable({
  providedIn: 'root'
})
export class ProgresssnippetService {

  overlayRef = this.overlay.create({
    hasBackdrop: true,
    positionStrategy: this.overlay
      .position().global().centerHorizontally().centerVertically()
  });

  matSpinner = new ComponentPortal(MatSpinner);

  constructor( private overlay: Overlay) { }

  attach() {
    this.overlayRef.attach(this.matSpinner);
  }

  detach() {
    this.overlayRef.detach();
  }
}
