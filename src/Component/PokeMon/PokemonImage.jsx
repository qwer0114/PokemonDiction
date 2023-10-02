/**포켓몬 이미지 출력하는 컴포넌트
 * @params 이미지 경로
 */
function PokemonImage({ image, imgStyle }) {
  return (
    <img
      className={`${imgStyle} border-slate-200  m-3 hover:shadow-2xl duration-200`}
      src={`${image}`}
      alt=""
    />
  );
}

export default PokemonImage;
