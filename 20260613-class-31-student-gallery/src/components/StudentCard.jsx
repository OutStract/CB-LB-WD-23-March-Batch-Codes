import Card from "./Card";

function StudentCard({ studentName, course, year, isTopper = false, skill = "Not specified", onSelect }) {
  return (
    <Card borderColor={isTopper ? 'green' : 'skyblue'} >
      {isTopper && <p><strong>Topper!</strong></p>}
      <h2>{studentName}</h2>
      <p><strong>Course: </strong>{course}</p>
      <p><strong>Year: </strong>{year}</p>
      <p><strong>Skill: </strong>{skill}</p>
      <button
        onClick={() => onSelect(studentName)}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >View Details</button>
    </Card>
  );
}





// Destructuring of props 3rd method.
// NOTE: props should be treated as READ-ONLY. Do not modify props directly. Instead, use state or other means to manage data within the component.
// function StudentCard({ studentName, course, year, isTopper = false, skill = "Not specified" }) {
//   return (
//     <div style={{
//       border: isTopper ? '2px solid red' : '2px solid skyblue',
//       borderRadius: '10px',
//       padding: '20px',
//       margin: '20px',
//       width: '280px',
//     }}>
//       <h2>{studentName}</h2>
//       <p><strong>Course: </strong>{course}</p>
//       <p><strong>Year: </strong>{year}</p>
//       <p><strong>Skill: </strong>{skill}</p>
//       {isTopper && <p><strong>Topper!</strong></p>}
//     </div>
//   );
// }



// Destructuring of props 2nd method.
// function StudentCard(props) {
//   const { studentName, course, year, skill } = props;
//   return (
//     <div style={{
//         border: '2px solid skyblue',
//         borderRadius: '10px',
//         padding: '20px',
//         margin: '20px',
//         width: '280px',
//     }}>
//       <h2>{studentName}</h2>
//       <p><strong>Course:</strong>{course}</p>
//       <p><strong>Year:</strong>{year}</p>
//       <p><strong>Skill:</strong>{skill}</p>
//     </div>
//   );
// }



// stateless functional component.
// Destructuring of props 1st method.

// function StudentCard(props) {
//   return (
//     <div style={{
//         border: '2px solid skyblue',
//         borderRadius: '10px',
//         padding: '20px',
//         margin: '20px',
//         width: '280px',
//     }}>
//       <h2>{props.studentName}</h2>
//       <p><strong>Course:</strong>{props.course}</p>
//       <p><strong>Year:</strong>{props.year}</p>
//       <p><strong>Skill:</strong>{props.skill}</p>
//     </div>
//   );
// }


export default StudentCard;