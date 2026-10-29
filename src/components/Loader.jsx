function Loader({ message = "Loading..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" />
      <p>{message}</p>
    </div>
  );
}

export default Loader;
