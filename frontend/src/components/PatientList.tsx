import React from 'react';
import PatientCard from './PatientCard';

interface PatientListProps {
  patients: any[];
  onDelete: (id: number) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onDelete }) => {
  if (patients.length === 0) {
    return <div className="empty-state">No patients registered yet.</div>;
  }

  return (
    <div className={`patient-list ${patients.length > 1 ? 'scroll-enabled' : ''}`}>
      {patients.map(patient => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onDelete={() => onDelete(patient.id)} 
        />
      ))}
    </div>
  );
};

export default PatientList;
