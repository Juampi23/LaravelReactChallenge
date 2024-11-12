import React, { useState, useEffect } from 'react';
import PatientForm from './components/PatientForm';
import PatientList from './components/PatientList';
import { api } from './services/api';
import './styles.css';

const App: React.FC = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      }
    };
    fetchPatients();
  }, []);

  const addPatient = (patient: any) => {
    setPatients([...patients, patient]);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/patients/${id}`);
      setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Failed to delete patient:', error);
    }
  };

  return (
    <div className="App">
      <h1>Patient Registration</h1>
      <PatientForm addPatient={addPatient} />
      <PatientList patients={patients} onDelete={handleDelete} />
    </div>
  );
};

export default App;
