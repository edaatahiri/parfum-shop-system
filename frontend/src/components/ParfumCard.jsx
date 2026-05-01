const ParfumCard = ({ p }) => {
  return (
    <div className="parfum-card">
      <h2>{p.emri}</h2>
      <div className="details">
        <p>
          <strong>Gjinia:</strong>
          {p.gjinia_target}
        </p>
        <p>
          <strong>Cmimi:</strong>
          {p.cmimi} $
        </p>
        <p>
          <strong>Stoku:</strong>
          {p.sasia_stok} copë
        </p>
        {p.kategoria && (
          <p className="category">Kategoria: {p.kategoria.emri}</p>
        )}
      </div>
    </div>
  );
};
export default ParfumCard;
