import CountUp from "react-countup";
import useDashboard from "../hooks/use-dashboard";

export default function DashboardCard() {
  const { cardInfo } = useDashboard();

  return (
    <div className="m-5 gap-6 grid grid-cols-2 sm:grid-cols-4">
      {cardInfo?.map((card) => {
        return (
          <div
            className="bg-white shadow p-4 border border-gray-300 rounded-2xl inline-grid"
            key={card.title}
          >
            <div className="place-items-center inline-grid gap-4 px-6 py-4 ">
              <div className="text-sm font-medium text-gray-500">
                {card.title}
              </div>
              <div
                className={`text-4xl leading-10 font-extrabold ${card.color}`}
              >
                <CountUp end={card.count} />
              </div>
              <div className="text-xs font-medium text-gray-400">Persons</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
