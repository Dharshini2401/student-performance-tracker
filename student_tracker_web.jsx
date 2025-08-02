import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const getStudent = (roll) => students.find((s) => s.rollNumber === roll);

  const calculateAverage = (student) => {
    const values = Object.values(student.grades);
    if (!values.length) return 0;
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Student Performance Tracker</h1>

      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="text-xl font-semibold">Add Student</h2>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
          <Button onClick={addStudent}>Add Student</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="text-xl font-semibold">Assign Grades</h2>
          <Input placeholder="Roll Number" value={selectedRoll} onChange={(e) => setSelectedRoll(e.target.value)} />
          <Input placeholder="Subject" onBlur={(e) => setGrades({ ...grades, subject: e.target.value })} />
          <Input placeholder="Grade (0-100)" type="number" onBlur={(e) => addGrade(grades.subject, e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 p-4">
          <h2 className="text-xl font-semibold">Student Details</h2>
          {students.map((student) => (
            <div key={student.rollNumber} className="border p-2 rounded-lg">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Roll Number:</strong> {student.rollNumber}</p>
              <p><strong>Grades:</strong> {JSON.stringify(student.grades)}</p>
              <p><strong>Average:</strong> {calculateAverage(student)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
