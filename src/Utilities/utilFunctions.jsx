/**매개변수로 배열을 받고 그 배열중에서 한국어 객체만 골라서 리턴해주는 함수 */
function convertKorean(arr) {
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

function division(arr, n개씩) {
  const array = [...arr];
  const length = array.length;
  const divide =
    Math.floor(length / n개씩) + (Math.floor(length % n개씩) > 0 ? 1 : 0);
  const newArray = [];

  for (let i = 0; i <= divide; i++) {
    newArray.push(array.splice(0, n개씩));
  }

  return newArray.filter((ar) => ar.length !== 0);
}

export { convertKorean, division };
