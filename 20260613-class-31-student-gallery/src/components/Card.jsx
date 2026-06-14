function Card({ children, borderColor }) {
  return (
    <div style={{
      border: `2px solid ${borderColor}`,
      borderRadius: '10px',
      padding: '20px',
      margin: '20px',
      width: '280px',
    }}>
      {children}
    </div>
  );
}

export default Card;