import { useState } from "react";

export default function StudentPerformanceTracker() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [grades, setGrades] = useState({});
  const [selectedRoll, setSelectedRoll] = useState("");

  const addStudent = () => {
    if (!name || !rollNumber) return;
    if (students.find((s) => s.rollNumber === rollNumber)) return alert("Roll number must be unique");
    setStudents([...students, { name, rollNumber, grades: {} }]);
    setName("");
    setRollNumber("");
  };

  const addGrade = (subject, grade) => {
    if (!selectedRoll || !subject || isNaN(grade) || grade < 0 || grade > 100) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.rollNumber === selectedRoll
          ? { ...s, grades: { ...s.grades, [subject]: parseFloat(grade) } }
          : s
      )
    );
  };

  const calculateAverage = (student) => {
    const values = Object.values(student.grades);
    if (!values.length) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Student Performance Tracker</h1>

      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">Add Student</h2>
        <input className="border px-2 py-1 w-full" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border px-2 py-1 w-full" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addStudent}>Add Student</button>
      </div>

      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">Assign Grades</h2>
        <input className="border px-2 py-1 w-full" placeholder="Roll Number" value={selectedRoll} onChange={(e) => setSelectedRoll(e.target.value)} />
        <input className="border px-2 py-1 w-full" placeholder="Subject" onBlur={(e) => setGrades({ ...grades, subject: e.target.value })} />
        <input className="border px-2 py-1 w-full" placeholder="Grade (0-100)" type="number" onBlur={(e) => addGrade(grades.subject, e.target.value)} />
      </div>

      <div className="border p-4 rounded-lg space-y-2">
        <h2 className="text-xl font-semibold">Student Details</h2>
        {students.map((student) => (
          <div key={student.rollNumber} className="border p-2 rounded-lg bg-gray-100">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Roll Number:</strong> {student.rollNumber}</p>
            <p><strong>Grades:</strong> {JSON.stringify(student.grades)}</p>
            <p><strong>Average:</strong> {calculateAverage(student)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
