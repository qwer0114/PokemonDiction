/**매개변수로 배열을 받고 그 배열중에서 한국어 객체만 골라서 리턴해주는 함수 */
export function convertKorean(arr) {
  let nameArray;
  let krNameObject;

  if (arr !== undefined) {
    nameArray = arr.filter((a) => {
      return a.language.name === "ko";
    });
    krNameObject = { ...nameArray };
  }

  return krNameObject;
}
