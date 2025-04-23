import React, { useState,useEffect  } from "react";

const StudentList = () => {
    // 👉 BẮT ĐẦU PHẦN MỚI: Lấy dữ liệu từ localStorage khi load trang
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

  // Lọc danh sách sinh viên theo tìm kiếm và lớp
  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass ? student.class === selectedClass : true;
    return matchesName && matchesClass;
  });

  // Hàm thêm sinh viên
  const handleAddStudent = () => {
    const newStudent = { ...form, id: Date.now() };
    setStudents((prev) => [...prev, newStudent]);
    setForm({ name: "", class: "", age: "" });
  };

  // Hàm xóa sinh viên
  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  // Hàm chỉnh sửa thông tin sinh viên
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
      
      {/* Ô tìm kiếm */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tìm sinh viên theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Dropdown lọc lớp */}
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
            <tr key={student.id} className="border-t border-gray-200">
              {editingId === student.id ? (
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