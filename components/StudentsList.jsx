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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Danh sách sinh viên</h1>
      
      {/* Tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm sinh viên theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Lọc theo lớp */}
      <div className="mb-4">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Tên"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border-2 border-gray-300 p-3 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Lớp"
          name="class"
          value={form.class}
          onChange={handleChange}
          className="border-2 border-gray-300 p-3 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Tuổi"
          name="age"
          value={form.age}
          onChange={handleChange}
          className="border-2 border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddStudent}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        >
          Thêm sinh viên
        </button>
      </div>

      {/* Bảng danh sách sinh viên */}
      <table className="min-w-full border-collapse table-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="text-left p-4">Tên</th>
            <th className="text-left p-4">Lớp</th>
            <th className="text-left p-4">Tuổi</th>
            <th className="text-left p-4">Hành động</th>
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
