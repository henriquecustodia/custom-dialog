import { Component, Directive, HostBinding, NgModule } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dialog',
  template: `
    <dialog open class="modal">
      <div class="modal-box">
        <ng-content></ng-content>
      </div>
    </dialog>
  `,
})
export class DialogComponent {}

@Component({
  standalone: true,
  selector: 'app-dialog-actions',
  template: `
    <div class="modal-action">
      <ng-content></ng-content>
    </div>
  `,
})
export class DialogActionsComponent {}

@Directive({
  standalone: true,
  selector: '[appDialogTitle]',
})
export class DialogTitleDirective {
  @HostBinding('class') class = 'text-lg font-bold text-base-content';
}

@NgModule({
  imports: [DialogComponent, DialogActionsComponent, DialogTitleDirective],
  exports: [DialogComponent, DialogActionsComponent, DialogTitleDirective],
})
export class DialogModule {}
