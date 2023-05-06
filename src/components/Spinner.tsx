import { TailSpin } from "react-loader-spinner";

export default function Spinnner() {
  return (
    <TailSpin
      color="#EE350D"
      ariaLabel="tail-spin-loading"
      wrapperStyle={{ position: "fixed", left: "45%", top: "50%" }}
    />
  );
}
