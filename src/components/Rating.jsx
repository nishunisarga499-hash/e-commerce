// Shows a 0-5 star rating, rounded to the nearest half star.
function Rating({ value = 0 }) {
  const rounded = Math.round(value * 2) / 2;

  return (
    <span className="rating" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`rating__star ${
            rounded >= star ? "rating__star--full" : rounded >= star - 0.5 ? "rating__star--half" : ""
          }`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
      <span className="rating__value">{value.toFixed(1)}</span>
    </span>
  );
}

export default Rating;
