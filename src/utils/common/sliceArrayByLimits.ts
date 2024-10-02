import { TripWithContract } from '@/types/Trips.types';

export const sliceArrayByLimit = (
  totalPage: number | TripWithContract[],
  limit: number,
): { slicedPageArray: number[][]; slicedDataArray: TripWithContract[][] } => {
  if (typeof totalPage === 'number') {
    const totalPageArray = Array(totalPage)
      .fill(0)
      .map((_, i) => i + 1);
    // .reverse(); // 배열을 역순으로 정렬

    return {
      slicedPageArray: Array(Math.ceil(totalPage / limit))
        .fill(0)
        .map(() => totalPageArray.splice(0, limit)),
      slicedDataArray: [],
    };
  } else {
    const totalPageArray = [...totalPage];
    return {
      slicedPageArray: [],
      slicedDataArray: Array(Math.ceil(totalPage.length / limit))
        .fill(0)
        .map(() => totalPageArray.splice(0, limit)),
    };
  }
};
