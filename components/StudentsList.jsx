// 👉 StudentList.jsx
import React, { useState, useEffect } from "react";
import StudentItem from "./StudentItem"; // Import component StudentItem

const StudentList = () => {
  const [students, setStudents] = useState(() => {
    const storedStudents = localStorage.getItem("students");
    return storedStudents ? JSON.parse(storedStudents) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", class: "", age: "" });

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    return matchesName && matchesClass;
  });

  const handleAddStudent = () => {
    const newStudent = { ...form, id: Date.now() };
    setStudents((prev) => [...prev, newStudent]);
    setForm({ name: "", class: "", age: "" });
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setForm({ name: student.name, class: student.class, age: student.age });
  };

  const handleSave = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...form, age: parseInt(form.age) } : student
      )
    );
    setEditingId(null);
    setForm({ name: "", class: "", age: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách sinh viên</h1>
      
      {/* Tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm sinh viên theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Lọc theo lớp */}
      <div className="mb-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">-- Tất cả các lớp --</option>
          {[...new Set(students.map((s) => s.class))].map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
      </div>

      {/* Thêm sinh viên */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tên"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Lớp"
          name="class"
          value={form.class}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-2"
        />
        <input
          type="number"
          placeholder="Tuổi"
          name="age"
          value={form.age}
          onChange={handleChange}
          className="border p-2 rounded w-full mt-2"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng danh sách sinh viên */}
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
          {filteredStudents.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
