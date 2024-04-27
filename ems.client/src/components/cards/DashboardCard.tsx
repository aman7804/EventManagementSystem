import "./style.css";

interface IDashBoardCard{
  title: string;
  startDate: string;
  endDate: string;
  number: number;
  percentage?: number | null;
  seeMore: string;
}

function DashboardCard(props: IDashBoardCard) {
  const  {title, startDate, endDate, number, percentage, seeMore } = props;

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="text-md">{title}</h2>
          <span className="d-inline-block mb-4 text-sm text-secondary">
            {startDate} - {endDate}
          </span>

          <div className="d-flex align-items-baseline justify-content-between">
            <h3 className="mb-0 display-2">{number}</h3>
            {percentage &&
            <span className="text-success font-weight-bold">
              <i className="zmdi zmdi-long-arrow-up" aria-hidden="true"></i>
              {percentage}%
            </span>}
          </div>
          {/* end of d-flex */}
        </div>
        {/* end of card-body */}
        <div className="px-1 py-1 border-top">
          <a
            href="/tables"
            className="btn btn-text btn-secondary btn-block d-flex align-items-center justify-content-between"
          >
            {seeMore}
            <i
              className="zmdi zmdi-arrow-right ml-1 icon"
              aria-hidden="true"
            ></i>
          </a>
        </div>
        {/* end of px-1 */}
      </div>
    </>
  );
}

export default DashboardCard;
