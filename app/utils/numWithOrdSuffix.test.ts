import numberWithOrdSuffix from "./numWithOrdSuffix";

const testCases = [
  { num: 1, expected: '1st'},
  { num: 2, expected: '2nd'},
  { num: 3, expected: '3rd'},
  { num: 4, expected: '4th'},
  { num: 5, expected: '5th'},
  { num: 10, expected: '10th'},
  { num: 11, expected: '11th'},
  { num: 12, expected: '12th'},
  { num: 13, expected: '13th'},
  { num: 14, expected: '14th'},
  { num: 15, expected: '15th'},
  { num: 21, expected: '21st'},
  { num: 22, expected: '22nd'},
  { num: 23, expected: '23rd'},
  { num: 24, expected: '24th'},
  { num: 113, expected: '113th'},
  { num: 123, expected: '123rd'}
]

describe('numberWithOrdSuffix', () => {
  test.each(testCases)(
  "%s",
  ({ num, expected }) => {
    
    const result = numberWithOrdSuffix(num);

    expect(result).toBe(expected);

    jest.clearAllMocks();
  },
);
})