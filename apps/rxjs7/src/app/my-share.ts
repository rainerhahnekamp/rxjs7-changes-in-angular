import { Observable, Subject, Subscription, tap } from 'rxjs';

export interface ShareConfig<T> {
  connector: () => Subject<T>;
  resetOnComplete: boolean;
  resetOnRefCountZero: boolean;
}

export function myShare<T>(config: ShareConfig<T>) {
  return (source$: Observable<T>) => {
    let isInitialised = false;
    let connector = config.connector();
    let subscription: Subscription;
    let refCount = 0;

    function reset() {
      isInitialised = false;
      connector = config.connector();
      subscription.unsubscribe();
    }

    function handleResetOnComplete() {
      if (config.resetOnComplete) {
        reset();
      }
    }

    function handleConnect() {
      if (!isInitialised) {
        isInitialised = true;
        subscription = source$.subscribe({
          next: (value) => connector.next(value),
          error: (err) => {
            const oldConnector = connector;
            reset();
            oldConnector.error(err);
          },
          complete: handleResetOnComplete,
        });
      }
    }

    function handleReset() {
      refCount--;
      if (config.resetOnRefCountZero && refCount === 0) {
        reset();
      }
    }

    return new Observable<T>((subscriber) => {
      refCount++;
      handleConnect();

      connector.subscribe(subscriber);
      return handleReset;
    });
  };
}
