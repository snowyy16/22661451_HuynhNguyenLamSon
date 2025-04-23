import React, { useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "10C3", age: 16 },
  ]);

  const [form, setForm] = useState({ name: "", class: "", age: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.name && form.class && form.age) {
      const newStudent = {
        id: Date.now(),
        name: form.name,
        class: form.class,
        age: parseInt(form.age),
      };
      setStudents((prev) => [...prev, newStudent]);
      setForm({ name: "", class: "", age: "" });
    }
  };
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>
      <div className="mb-6 grid grid-cols-4 gap-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Họ tên"
          className="border p-2 rounded col-span-1"
        />
        <input
          type="text"
          name="class"
          value={form.class}
          onChange={handleChange}
          placeholder="Lớp"
          className="border p-2 rounded col-span-1"
        />
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Tuổi"
          className="border p-2 rounded col-span-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 col-span-1"
        >
          Thêm sinh viên
        </button>
      </div>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Tên</th>
            <th className="text-left p-2">Lớp</th>
            <th className="text-left p-2">Tuổi</th>
            <th className="text-left p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="border-t border-gray-200">
              <td className="p-2">{student.name}</td>
              <td className="p-2">{student.class}</td>
              <td className="p-2">{student.age}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(student.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
