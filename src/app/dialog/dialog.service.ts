import { DOCUMENT } from '@angular/common';
import {
  Injectable,
  inject,
  ApplicationRef,
  EnvironmentInjector,
  Type,
  ComponentRef,
  Injector,
  createComponent,
} from '@angular/core';
import { Subject } from 'rxjs';

export abstract class DialogRef {
  abstract close(value: unknown): void;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  applicationRef = inject(ApplicationRef);
  environmentInjector = inject(EnvironmentInjector);
  document = inject(DOCUMENT);

  open<T>(component: Type<T>) {
    const container = this.document.createElement('dialog-container');
    this.document.body.appendChild(container);

    // eslint-disable-next-line prefer-const
    let componentRef: ComponentRef<T>;

    const afterClosed$ = new Subject();

    const dialogRef: DialogRef = {
      close: (value: unknown) => {
        this.applicationRef.detachView(
          (componentRef as ComponentRef<T>).hostView
        );
        (componentRef as ComponentRef<T>).destroy();
        container.remove();

        afterClosed$.next(value);
      },
    };

    const dialogInjector = Injector.create({
      providers: [
        {
          provide: DialogRef,
          useValue: dialogRef,
        },
      ],
    });

    componentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
      hostElement: container,
      elementInjector: dialogInjector,
    });

    this.applicationRef.attachView(componentRef.hostView);

    return {
      afterClosed: () => afterClosed$.asObservable(),
    };
  }
}
