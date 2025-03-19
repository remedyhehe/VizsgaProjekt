import React, { useState, useEffect } from "react";
import { FaPlus, FaGripVertical } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Table = () => {
  const [columns, setColumns] = useState([
    { id: 1, name: "Title" },
    { id: 2, name: "Status" },
    { id: 3, name: "Assignees" },
  ]);
  const [rows, setRows] = useState([{ id: 1, data: ["", "", ""] }]);
  const [users, setUsers] = useState([]); // Felhasználók állapota

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/users");
      const result = await res.json();
      if (result.status) {
        setUsers(result.data); // Frissíti a users állapotot
      } else {
        console.error("Error fetching users:", result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const moveColumn = (dragIndex, hoverIndex) => {
    const updatedColumns = [...columns];
    const [movedColumn] = updatedColumns.splice(dragIndex, 1);
    updatedColumns.splice(hoverIndex, 0, movedColumn);
    setColumns(updatedColumns);

    setRows((prevRows) =>
      prevRows.map((row) => {
        const updatedData = [...row.data];
        const [movedData] = updatedData.splice(dragIndex, 1);
        updatedData.splice(hoverIndex, 0, movedData);
        return { ...row, data: updatedData };
      })
    );
  };

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), data: new Array(columns.length).fill("") },
    ]);
  };

  const addColumn = () => {
    const newId = columns.length + 1;
    setColumns([...columns, { id: newId, name: `Oszlop ${newId}` }]);
    setRows((prevRows) =>
      prevRows.map((row) => ({ ...row, data: [...row.data, ""] }))
    );
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].data[colIndex] = value;
    setRows(updatedRows);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-10 h-screen bg-gray-900 text-white">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr>
              {columns.map((col, colIndex) => (
                <DraggableColumn
                  key={col.id}
                  index={colIndex}
                  moveColumn={moveColumn}
                  name={col.name}
                />
              ))}
              <th className="border border-gray-700 p-2">
                <button
                  onClick={addColumn}
                  className="hover:bg-gray-400 p-2 rounded"
                >
                  <FaPlus />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row.id}>
                {row.data.map((cell, colIndex) => (
                  <td key={colIndex} className="border border-gray-700 p-2">
                    {columns[colIndex].name === "Assignees" ? (
                      <select
                        value={cell}
                        onChange={(e) =>
                          updateCell(rowIndex, colIndex, e.target.value)
                        }
                        className="bg-gray-800 text-white p-1 w-full"
                      >
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) =>
                          updateCell(rowIndex, colIndex, e.target.value)
                        }
                        className="bg-gray-800 text-white p-1 w-full"
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <button
            onClick={addRow}
            className="hover:bg-gray-400 p-2 m-2 rounded"
          >
            <FaPlus />
          </button>
        </table>
      </div>
    </DndProvider>
  );
};

const DraggableColumn = ({ name, index, moveColumn }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <th
      ref={(node) => drag(drop(node))}
      className={`border border-gray-700 p-2 cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <FaGripVertical className="inline mr-2" /> {name}
    </th>
  );
};

export default Table;
