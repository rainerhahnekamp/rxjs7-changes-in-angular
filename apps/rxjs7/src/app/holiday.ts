export interface Holiday {
  id: number;
  title: string;
  teaser: string;
  description: string;
  imageUrl: string;
  typeId: number;
  durationInDays: number;
  minCount: number;
  maxCount: number;
  onSale?: boolean;
  soldOut?: boolean;
}

let runningId = 1;

export function createHoliday(holiday: Partial<Holiday> = {}): Holiday {
  return {
    id: runningId++,
    title: 'Dummy',
    teaser: 'Some teaser',
    description: 'A nice description',
    imageUrl: '',
    typeId: 1,
    durationInDays: 10,
    minCount: 7,
    maxCount: 15,
    onSale: false,
    soldOut: false,
    ...holiday
  };
}
