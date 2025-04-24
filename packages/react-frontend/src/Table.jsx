// src/Table.jsx
import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr style={{ backgroundColor: '#238bb1', color: 'white' }}>
          <th>ID</th>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
}
  
function TableBody(props) {
    const rows = props.characterData.map((row) => {
      return (
        <tr key={row._id}>
          <td>{row._id}</td>
          <td>{row.name}</td>
          <td>{row.job}</td>
        <td>
            <button 
              onClick={() => props.removeCharacter(row._id)}
              style={{
                backgroundColor: '#d71f1f', 
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                cursor: 'pointer'
              }}
            >
            Delete
            </button>
        </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
}

function Table(props) {
    return (
        <table>
        <TableHeader />
        <TableBody
            characterData={props.characterData}
            removeCharacter={props.removeCharacter}
        />
        </table>
    ); 
}

export default Table;