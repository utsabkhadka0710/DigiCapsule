const TimerContainer = ({ value, label }: { value: string; label: string }) => {
  return (
    <div className="h-28 rounded-lg bg-gray-800">
      <p className="text-primary text-4xl font-extrabold mt-4">{value}</p>
      <p className="mt-3 text-gray-300 font-semibold">{label}</p>
    </div>
  );
};
export default TimerContainer;
