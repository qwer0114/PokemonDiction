import { useNavigate } from "react-router";
import { typeData } from "../Data/typeData";

function Navigation() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex">
        {typeData.map((type, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                navigate(`/type/${type.id}`);
              }}
            >
              <div className="w-10"> {type.icon()}</div>
              <div>{type.KRName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Navigation;
