import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div
      id="loading-container"
      className="absolute inset-0 flex justify-center items-center z-50 backdrop-blur-2xl"
    >
      <ClipLoader
        size={70}
        color="white"
      />
    </div>
  );
}
