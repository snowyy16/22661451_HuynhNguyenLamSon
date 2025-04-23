// 👉 StudentItem.jsx
import React from "react";

const StudentItem = ({ student, onDelete, onEdit }) => {
  return (
    <tr className="border-t border-gray-200">
      <td className="p-2">{student.name}</td>
      <td className="p-2">{student.class}</td>
      <td className="p-2">{student.age}</td>
      <td className="p-2 space-x-2">
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={() => onEdit(student)}
        >
          Sửa
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(student.id)}
        >
          Xoá
        </button>
      </td>
    </tr>
  );
};

export default StudentItem;
