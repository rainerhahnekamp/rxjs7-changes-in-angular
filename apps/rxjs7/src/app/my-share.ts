import { Observable, Subject, Subscription } from 'rxjs';

export function myShare<T>(config: {
  connector: () => Subject<T>;
  resetOnComplete: boolean;
  resetOnRefCountZero: boolean;
}) {
  return (source$: Observable<T>): Observable<T> => {
    let connector = config.connector();
    let connected = false;
    let subscription: Subscription;
    let refCount = 0;

    function reset() {
      connected = false;
      connector = config.connector();
      subscription.unsubscribe();
    }

    function handleResetOnRefCountZero() {
      if (config.resetOnRefCountZero && refCount === 0) {
        reset();
      }
    }

    function handleResetOnComplete() {
      if (config.resetOnComplete) {
        reset();
      }
    }

    function handlePotentialInit() {
      if (connected) {
        return;
      }

      connected = true;
      subscription = source$.subscribe({
        next: (value) => connector.next(value),
        complete: handleResetOnComplete,
      });
    }

    return new Observable((subscriber) => {
      refCount++;
      handlePotentialInit();
      connector.subscribe({ next: (value) => subscriber.next(value) });
      return () => {
        refCount--;
        handleResetOnRefCountZero();
      };
    });
  };
}
