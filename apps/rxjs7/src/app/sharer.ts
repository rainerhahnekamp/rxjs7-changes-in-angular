import {
  finalize,
  Observable,
  Observer,
  OperatorFunction,
  Subject,
  Subscription,
  tap,
} from 'rxjs';

export interface SharerConfig<T> {
  connector: () => Subject<T>;
  resetOnComplete: boolean;
  resetOnRefCountZero: boolean;
}

export class Sharer<T> {
  private subject = this.config.connector();
  private subscribed = false;
  private subscription: Subscription | undefined;

  constructor(
    private source$: Observable<T>,
    private config: SharerConfig<T>
  ) {}

  pipe<A>(operator: OperatorFunction<T, A>) {
    this.checkForInit();
    return this.subject.pipe(
      operator,
      finalize(() => this.checkForUnsubscriptions())
    );
  }
  checkForUnsubscriptions(): void {
    if (
      this.config.resetOnRefCountZero &&
      this.subject.observers.length === 0
    ) {
      this.reset();
    }
  }

  subscribe(observer: Partial<Observer<T>>) {
    return this.pipe(tap(() => true)).subscribe(observer);
  }

  private checkForInit() {
    if (!this.subscribed) {
      this.subscribed = true;
      this.subscription = this.source$.subscribe({
        next: (value) => this.subject.next(value),
        complete: () => this.checkForResetOnComplete(),
      });
    }
  }
  private checkForResetOnComplete(): void {
    if (this.config.resetOnComplete) {
      this.reset();
    }
  }
  private reset() {
    this.subscribed = false;
    this.subscription?.unsubscribe();
    this.subject = this.config.connector();
  }
}

export function withSharer<T>(
  observable: Observable<T>,
  config: SharerConfig<T>
): Observable<T> {
  return new Sharer(observable, config) as unknown as Observable<T>;
}
