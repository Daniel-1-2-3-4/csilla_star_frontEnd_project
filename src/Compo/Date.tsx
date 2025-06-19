const CurrentDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full h-fit flex text-[#510065] text-xl font-bold justify-start">
      <p>Heute:</p>
      <p className="ml-2">{formattedDate}</p>
    </div>
  );
};

export default CurrentDate;
