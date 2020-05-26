import React from "react";
import style from "./movie_tv.module.css";

const toCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
};

class Details extends React.Component {
  render() {
    const { details } = this.props;
    return (
      <div className={style.details}>
        <div className={style["details-row"]}>
          <span>Genres:</span>
          <div className={style["data-container"]}>
            {details.genres &&
              details.genres.map((g, i) => (
                <data key={g.id}>
                  {g.name}
                  {i < details.genres.length - 1 && (
                    <devider>&nbsp;|&nbsp;</devider>
                  )}
                </data>
              ))}
          </div>
        </div>
        <div className={style["details-row"]}>
          <span>Homepage:</span>
          <data>
            {details.homepage === "" ? (
              "N/A"
            ) : (
              <a
                href={details.homepage}
                target="_blank"
                style={{ color: "#C7493A" }}
              >
                {details.homepage}
              </a>
            )}
          </data>
        </div>
        <div className={style["details-row"]}>
          <span>Production Companies:</span>
          <div className={style["data-container"]}>
            {details.production_companies &&
              details.production_companies.map((p, i) => (
                <data key={p.id}>
                  {p.name}
                  {i < details.production_companies.length - 1 && (
                    <devider>&nbsp;|&nbsp;</devider>
                  )}
                </data>
              ))}
          </div>
        </div>
        <div className={style["details-row"]}>
          <span>Vote Average:</span>
          <data>{details.vote_average} (themoviedb.org)</data>
        </div>

        <div className={style["details-row"]}>
          <span>Vote Count:</span>
          <data>{details.vote_count} (themoviedb.org)</data>
        </div>

        <div className={style["details-row"]}>
          <span>Release Date:</span>
          <data>{details.release_date}</data>
        </div>

        <div className={style["details-row"]}>
          <span>Runtime:</span>
          <data>{details.runtime} minutes</data>
        </div>

        <div className={style["details-row"]}>
          <span>Budget:</span>
          <data>{toCurrency(details.budget)}</data>
        </div>

        <div className={style["details-row"]}>
          <span>Revenue:</span>
          <data>{toCurrency(details.revenue)}</data>
        </div>
      </div>
    );
  }
}

export default Details;
