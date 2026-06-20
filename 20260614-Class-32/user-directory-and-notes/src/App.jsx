import { useState } from 'react'
// import './App.css'
import Counter from './components/Counter';
import SearchInput from './components/SearchInput';
import ClickTracker from './components/ClickTracker';
import DemoUseEffect from './components/DemoUseEffect';
import UserDirectory from './components/UserDirectory';

const [homepage, setHomepage] = useState(true);
const [aboutPage, setAboutPage] = useState(false);
const [careerPage, setCareerpage] = useState(false);

function App() {
  if (homepage) {
    return (<HomePage/>)
  }
}


// function App() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [darkMode, setDarkMode] = useState(false);

//   const [users] = useState([
//     {id: 1, name: 'Anya Kansal', email: 'anya.kansal@example.com', company:'Meta'},
//     {id: 2, name: 'Saloni M', email: 'saloni.m@example.com', company:'Google'},
//     {id: 3, name: 'Chaitanya Sharma', email: 'chaitanya.sharma@example.com', company:'Netflix'},
//     {id: 4, name: 'Siddharth Sharma', email: 'siddharth.sharma@example.com', company:'Amazon'},
//   ])

//   // Derived State -> State that can be computed from other state variables. It is not stored in the state, but calculated on the fly based on the current state values. It helps to avoid redundancy and keeps the state management simpler.
//   const filteredUsers = users.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const theme = {
//     bg: darkMode ? '#333' : '#fff',
//     text: darkMode ? '#fff' : '#333',
//   }

//   return (
//     <div style={{ 
//       height: '100vh',
//       backgroundColor: theme.bg,
//       color: theme.text,
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       // justifyContent: 'center',
//     }}>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
//         <h1> User Directory </h1>
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//         >
//           {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
//         </button>
//       </div>

//       {/* <input
//         type="text"
//         placeholder="Search users by name or email"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ margin: '20px', padding: '10px', width: '300px' }}
//       /> */}

//       <SearchInput
//         searchTerm={searchTerm}
//         onSearchChange={setSearchTerm}
//       />

//       {searchTerm !== '' &&<p>Showing {filteredUsers.length} of {users.length} users</p>}
//       {searchTerm !== '' && (
//         <div>
//           {filteredUsers.map(user => (
//             <div key={user.id} style={{ border: `1px solid ${theme.text}`, padding: '10px', margin: '10px', borderRadius: '5px' }}>
//               <h2>{user.name}</h2>
//               <p>{user.email}</p>
//           </div>
//         ))}
//       </div>)}

//       {filteredUsers.length === 0 && searchTerm !== '' && <p>No users found.</p>}

//     </div>
//   )
// }


// function App() {
//   return (
//     <DemoUseEffect />
//   )
// }



// function App() {
//   return (
//     <ClickTracker />
//   )
// }






// function App() {
//   return (
//     <Counter />
//   )
// }

export default App
