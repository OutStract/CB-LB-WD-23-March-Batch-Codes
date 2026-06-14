import StudentCard from './components/StudentCard';

const studentData = [
  {
    id: 1,
    studentName: "Depender Kumar Soni",
    course: "B.Tech CSE",
    year: "2nd year",
  },
  {
    id: 2,
    studentName: "Anya Kansal",
    course: "B.Tech ECE",
    year: "3rd year",
    isTopper: true,
    skill: "Python programming"
  },
  {
    id: 3,
    studentName: "Siddharth Sharma",
    course: "B.Tech ME",
    year: "4th year",
    isTopper: false,
    skill: "React development"
  },
  {
    id: 4,
    studentName: "Prateek Thakur",
    course: "B.Tech CSE",
    year: "2nd year",
    isTopper: false,
    skill: "Web development"
  }
];

function App() {
  const handleSelectStudent = (studentName) => {
    alert(`Selected Student: ${studentName}`);
  };
  return (
    <div>
      <h1>Student Gallery</h1>
      {studentData.map((student) => (
        <StudentCard
          key={student.id}
          {...student}
          onSelect={handleSelectStudent}
        />
      ))}
    </div>
  )
}

export default App
