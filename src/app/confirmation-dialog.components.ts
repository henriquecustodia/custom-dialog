import { Component, inject } from '@angular/core';
import { DialogModule } from './dialog/dialog.component';
import { DialogRef } from './dialog/dialog.service';

@Component({
  standalone: true,
  selector: 'app-name',
  imports: [DialogModule],
  template: `
    <app-dialog>
      <h3 appDialogTitle>Você tem certeza?</h3>
      <p class="py-4 text-base-content">
        Você realmente quer fazer isso essa ação? Esta ação não pode ser
        desfeita.
      </p>
      <app-dialog-actions>
        <button class="btn" (click)="onCancel()">Não...</button>
        <button class="btn btn-error" (click)="onConfirmation()">Sim!</button>
      </app-dialog-actions>
    </app-dialog>
  `,
})
export class ConfirmationDialogComponent {
  dialogRef = inject(DialogRef);

  onConfirmation() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
