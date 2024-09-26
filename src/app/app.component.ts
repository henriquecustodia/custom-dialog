import { Component, computed, inject, signal } from '@angular/core';

import { DialogService } from './dialog/dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog.components';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  dialogService = inject(DialogService);

  result = signal<unknown>(null);

  huminazedResult = computed(() => {
    if (this.result() == null) {
      return 'Aguardando resposta...';
    } else if (this.result() == true) {
      return 'Sim';
    } else {
      return 'Não';
    }
  });

  openDialog() {
    const dialog = this.dialogService.open(ConfirmationDialogComponent);
    dialog.afterClosed().subscribe((result) => {
      this.result.set(result);
    });
  }
}
