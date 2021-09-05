import { fakeAsync, tick } from '@angular/core/testing';
import {
  Observable,
  ReplaySubject,
  share,
  SubjectLike,
  Subscription,
} from 'rxjs';

/**
 * - does a subscriber too late still get the former emits
 * - does  a the source all, resubscribe to the source
 * - what happens, if a subscriber hits a completed source
 * - what happens if an error is submitted
 */

type ShareConfigName =
  | 'default share'
  | 'noResetOnComplete'
  | 'ReplaySubject'
  | 'ReplaySubjectWithNoResetOnComplete'
  | 'resetOnUnsubscribed';
type ConfigName =
  | 'default'
  | 'tooLate'
  | 'sourceCompleted'
  | 'unsubscribed'
  | 'failed';

interface Config {
  name: ConfigName;
  complete?: boolean;
  throwError?: boolean;
  unsubscribe?: boolean;
  secondTooLate?: boolean;
}

interface ShareConfig<T> {
  connector: () => SubjectLike<T>;
  resetOnError: boolean | ((error: any) => Observable<any>);
  resetOnComplete: boolean | (() => Observable<any>);
  resetOnRefCountZero: boolean | (() => Observable<any>);
}

const shareConfigs: (Partial<ShareConfig<unknown>> & {
  name: ShareConfigName;
})[] = [
  { name: 'default share' },
  { name: 'noResetOnComplete', resetOnComplete: false },
  { name: 'ReplaySubject', connector: () => new ReplaySubject() },
  {
    name: 'ReplaySubjectWithNoResetOnComplete',
    connector: () => new ReplaySubject(),
    resetOnComplete: false,
  },
  {
    name: 'resetOnUnsubscribed',
    connector: () => new ReplaySubject(),
    resetOnComplete: false,
    resetOnRefCountZero: false,
  },
];

const expects: {
  configName: ConfigName;
  shareConfigName: ShareConfigName;
  sourceSubscriptions: number;
  subscriptionsWithValuesReceived: number;
  completedReceived: number;
}[] = [
  {
    configName: 'default',
    shareConfigName: 'default share',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'sourceCompleted',
    shareConfigName: 'default share',
    sourceSubscriptions: 2,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 2,
  },
  {
    configName: 'tooLate',
    shareConfigName: 'default share',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 1,
    completedReceived: 0,
  },
  {
    configName: 'unsubscribed',
    shareConfigName: 'default share',
    sourceSubscriptions: 2,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },

  // noResetOnComplete
  {
    configName: 'default',
    shareConfigName: 'noResetOnComplete',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'sourceCompleted',
    shareConfigName: 'noResetOnComplete',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 1,
    completedReceived: 2,
  },
  {
    configName: 'tooLate',
    shareConfigName: 'noResetOnComplete',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 1,
    completedReceived: 0,
  },
  {
    configName: 'unsubscribed',
    shareConfigName: 'noResetOnComplete',
    sourceSubscriptions: 2,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },

  // ReplaySubject
  {
    configName: 'default',
    shareConfigName: 'ReplaySubject',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'sourceCompleted',
    shareConfigName: 'ReplaySubject',
    sourceSubscriptions: 2,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 2,
  },
  {
    configName: 'tooLate',
    shareConfigName: 'ReplaySubject',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'unsubscribed',
    shareConfigName: 'ReplaySubject',
    sourceSubscriptions: 2,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },

  // ReplaySubject with no reset on complete
  {
    configName: 'default',
    shareConfigName: 'ReplaySubjectWithNoResetOnComplete',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'sourceCompleted',
    shareConfigName: 'ReplaySubjectWithNoResetOnComplete',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 2,
  },
  {
    configName: 'tooLate',
    shareConfigName: 'ReplaySubjectWithNoResetOnComplete',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'unsubscribed',
    shareConfigName: 'ReplaySubjectWithNoResetOnComplete',
    sourceSubscriptions: 2,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },

  // No Reset on unsubscribe
  {
    configName: 'default',
    shareConfigName: 'resetOnUnsubscribed',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'sourceCompleted',
    shareConfigName: 'resetOnUnsubscribed',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 2,
  },
  {
    configName: 'tooLate',
    shareConfigName: 'resetOnUnsubscribed',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
  {
    configName: 'unsubscribed',
    shareConfigName: 'resetOnUnsubscribed',
    sourceSubscriptions: 1,
    subscriptionsWithValuesReceived: 2,
    completedReceived: 0,
  },
];

const configs: Config[] = [
  {
    name: 'default',
    secondTooLate: false,
  },
  {
    name: 'sourceCompleted',
    complete: true,
  },
  {
    name: 'tooLate',
  },
  {
    name: 'unsubscribed',
    unsubscribe: true,
  },
];

const defaultConfig: Omit<Config, 'name'> = {
  secondTooLate: true,
  unsubscribe: false,
  complete: false,
  throwError: false,
};

describe('shared', () => {
  for (let c of configs) {
    for (let shareConfig of shareConfigs) {
      const config = { ...defaultConfig, ...c };
      const expected = expects.find(
        ({ configName, shareConfigName }) =>
          config.name === configName && shareConfig.name === shareConfigName
      );
      if (expected === undefined) {
        throw new Error(`no expect for ${config.name} - ${shareConfig.name}`);
      }

      it(`${config.name} - ${shareConfig.name}`, fakeAsync(() => {
        let sourceSubscriptions = 0;
        let subscriptionsWithValueReceived = 0;
        let completedReceived = 0;
        let subscription1: Subscription;
        let subscription2: Subscription;

        const observable = new Observable((subscriber) => {
          sourceSubscriptions++;
          window.setTimeout(() => {
            subscriber.next(1);
            if (config.complete) {
              subscriber.complete();
            }
          }, 10);
        }).pipe(share(shareConfig));

        window.setTimeout(() => {
          subscription1 = observable.subscribe({
            next: (value) => {
              expect(value).toBe(1);
              subscriptionsWithValueReceived++;
            },
            complete: () => completedReceived++,
          });
        }, 20);

        if (config.unsubscribe) {
          window.setTimeout(() => subscription1.unsubscribe(), 40);
        }

        window.setTimeout(
          () => {
            subscription2 = observable.subscribe({
              next: (value) => {
                expect(value).toBe(1);
                subscriptionsWithValueReceived++;
              },
              complete: () => completedReceived++,
            });
          },
          config.secondTooLate ? 60 : 20
        );

        tick(100);

        expect(subscriptionsWithValueReceived).toBe(
          expected.subscriptionsWithValuesReceived
        );
        expect(sourceSubscriptions).toBe(expected.sourceSubscriptions);
        expect(completedReceived).toBe(expected.completedReceived);
      }));
    }
  }
});
