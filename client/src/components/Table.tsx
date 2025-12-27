import React from 'react';

interface TableProps {
  headers: string[];
  rows: string[][];
  darkMode?: boolean;
}

const Table: React.FC<TableProps> = ({ headers, rows, darkMode = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
          <tr>
            {headers.map((h, i) => <th key={i} className="px-4 py-2 text-left font-medium">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {row.map((cell, j) => <td key={j} className="px-4 py-2">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
