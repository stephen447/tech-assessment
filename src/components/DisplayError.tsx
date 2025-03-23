const DisplayError: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[100%]">
      <p className="text-2xl text-white font-semibold">
        Error loading data. Please try again.
      </p>
    </div>
  );
};
export default DisplayError;
