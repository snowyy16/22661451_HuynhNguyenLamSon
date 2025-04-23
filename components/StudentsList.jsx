import React, { useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 18 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 17 },
    { id: 3, name: "Lê Văn C", class: "10C3", age: 16 },
  ]);

  const [form, setForm] = useState({ name: "", class: "", age: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const uniqueClasses = [...new Set(students.map((s) => s.class))];

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
  const filteredStudents = students.filter((student) =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredStudentsAndClass = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    return matchesName && matchesClass;
  });
  return (
    <div className="max-w-2xl mx-auto p-4">
        <div className="mb-4">
  <input
    type="text"
    placeholder="Tìm sinh viên theo tên..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border p-2 rounded"
  />
</div>
<div className="mb-4">
  <select
    value={selectedClass}
    onChange={(e) => setSelectedClass(e.target.value)}
    className="w-full border p-2 rounded"
  >
    <option value="">-- Tất cả các lớp --</option>
    {uniqueClasses.map((cls) => (
      <option key={cls} value={cls}>
        {cls}
      </option>
    ))}
  </select>
</div>

      <h1 className="text-2xl font-bold mb-4 ">Danh sách sinh viên</h1>
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
  {filteredStudentsAndClass.map((student) => (
    <tr key={student.id} className="border-t border-gray-200">
      {editingId === student.id ? (
        // 👉 BẮT ĐẦU PHẦN MỚI: Nếu đang sửa thì hiện input
        <>
          <td className="p-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="p-2">
            <input
              name="class"
              value={form.class}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="p-2">
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          </td>
          <td className="p-2 space-x-2">
            <button
              onClick={() => handleSave(student.id)}
              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
            >
              Lưu
            </button>
            <button
              onClick={() => setEditingId(null)}
              className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
            >
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-2">{student.name}</td>
          <td className="p-2">{student.class}</td>
          <td className="p-2">{student.age}</td>
          <td className="p-2 space-x-2">
            <button
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              onClick={() => handleEdit(student)}
            >
              Sửa
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(student.id)}
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default StudentList;
