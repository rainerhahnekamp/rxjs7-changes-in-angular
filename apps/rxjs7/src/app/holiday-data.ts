import { Holiday } from './holiday';

export const holidayData: Holiday[] = [
  {
    id: 1,
    title: 'Vienna / Wien',
    teaser: 'Dive into the capital of the Habsburg empire',
    imageUrl: '/assets/vienna.jpg',
    description:
      'With a population of almost 2 million, Vienna is the second largest German-speaking city and breathes history in every corner.',
    durationInDays: 4,
    minCount: 5,
    maxCount: 12,
    typeId: 1,
    onSale: true,
  },
  {
    id: 2,
    title: 'London',
    teaser: "Explore one of the world's most famous cities",
    imageUrl: '/assets/london.jpg',
    description:
      'Being a tourist magnet, this city needs no further introduction.',
    durationInDays: 5,
    minCount: 10,
    maxCount: 25,
    typeId: 1,
  },
  {
    id: 3,
    title: 'Detroit',
    teaser: 'Top 10 of the cosmopolitan cities of the world',
    imageUrl: '/assets/detroit.jpg',
    description:
      "This US city is mainly known for the autombile industry. It hosts the GM's headquarters.",
    durationInDays: 2,
    minCount: 10,
    maxCount: 15,
    typeId: 1,
  },
  {
    id: 4,
    title: 'Reykjavík',
    teaser: 'The northernmost capital of the world and entry to Iceland',
    imageUrl: '/assets/reykjavík.jpg',
    description:
      'Iceland is a small island between Europe and America. It is best known for its nature and landscape which look almost alien.',
    durationInDays: 1,
    minCount: 2,
    maxCount: 8,
    typeId: 1,
  },
  {
    id: 5,
    title: 'Copenhagen / København',
    teaser: "Europe's most livable city",
    imageUrl: '/assets/copenhagen.jpg',
    description:
      'Copenhagen is the capital of Denmark and is located on Seenland which is one of the three main Danish islands.',
    soldOut: true,
    durationInDays: 3,
    minCount: 5,
    maxCount: 12,
    typeId: 1,
  },
  {
    id: 6,
    title: 'Shanghai / 上海市',
    teaser: 'East meets West',
    imageUrl: '/assets/shanghai.jpg',
    description:
      'Although not being the capital of China, Shanghai is a good choice to for a China voyage. It can be reached very easily.',
    durationInDays: 6,
    minCount: 8,
    maxCount: 18,
    typeId: 1,
  },
  {
    id: 7,
    title: 'Florence/ Firenze',
    teaser: 'Michelangelo’s David, da Vinci, and Chianti',
    imageUrl: '/assets/firenze.jpg',
    description:
      'Birthplace of the Renaissance. Many famous artists left their mark. You can marvel at them at the Uffizi Gallery.',
    durationInDays: 3,
    minCount: 5,
    maxCount: 12,
    typeId: 1,
  },
  {
    id: 8,
    title: 'Granada',
    teaser: 'Muslim history in Spain',
    imageUrl: '/assets/granada.jpg',
    description:
      'The Alhambra is not just the major attraction in Granada but also counts to the top must-sees in whole Spain. ',
    durationInDays: 2,
    minCount: 5,
    maxCount: 10,
    typeId: 1,
  },
  {
    id: 9,
    title: 'Lübeck',
    teaser: 'City of the Hanseatic League',
    imageUrl: '/assets/luebeck.jpg',
    description:
      'A medieval city in the North of Germany and home place to the famous Hanseatic League',
    durationInDays: 1,
    minCount: 5,
    maxCount: 12,
    typeId: 1,
  },
];
