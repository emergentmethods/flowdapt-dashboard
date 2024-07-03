import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="w-full flex justify-center my-12">
      <div className="w-16 h-16 border-t-4 border-primary rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
