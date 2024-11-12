import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import './styles.css';

const App: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients') || '[]');
    setPatients(storedPatients);
  }, []);

  const addPatient = (patient: any) => {
    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const handleDelete = (id: number) => {
    const updatedPatients = patients.filter(patient => patient.id !== id);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  return (
    <div className="App">
      <h1>Patient registration</h1>
      <PatientForm addPatient={addPatient} />
      <PatientList patients={patients} onDelete={handleDelete} />
    </div>
  );
};

export default App;
