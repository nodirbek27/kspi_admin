import { MetroSpinner } from "react-spinners-kit";

const Loader = () => {
  return (
    <>
      <div className="spinnerContainer w-[100%] h-[100%] absolute t-0 bg-transparent flex items-center justify-center">
        <div className="spinner">
          <MetroSpinner size={80} color="white" />
        </div>
      </div>
    </>
  );
};

export default Loader;
