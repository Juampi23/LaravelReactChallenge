import React, { useState } from 'react';

interface PatientCardProps {
  patient: any;
  onDelete: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="patient-card">
      <img src={patient.documentPhoto} alt={patient.name} className="document-photo" />
      <h3>{patient.name}</h3>
      <button className='hide-details' onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Hide details' : 'Show details'}
      </button>

      {isExpanded && (
        <div>
          <p>Email: {patient.email}</p>
          <p>Phone: (+{patient.countryCode}) {patient.phoneNumber}</p>
          <button className='delete-patient' onClick={onDelete}>Delete Patient</button>
        </div>
      )}
    </div>
  );
};

export default PatientCard;
