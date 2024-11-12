import React, { useState, useEffect } from 'react';

interface PatientFormProps {
  addPatient: (patient: any) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ addPatient }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null);

  // Error states for each field
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [countryCodeError, setCountryCodeError] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [documentPhotoError, setDocumentPhotoError] = useState<string>('');
  const [generalError, setGeneralError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Reset error messages
    setGeneralError('');
    setNameError('');
    setEmailError('');
    setCountryCodeError('');
    setPhoneNumberError('');
    setDocumentPhotoError('');

    // Validate fields
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
      setNameError(!name ? 'A name must be provided' : 'Name should only contain letters.');
      hasError = true;
    }

    if (!email || !/^[a-zA-Z0-9._-]+@gmail\.com$/.test(email)) {
      setEmailError(!email ? 'An email must be provided' : 'Email must be a Gmail address.');
      hasError = true;
    }

    if (!countryCode || !/^\d+$/.test(countryCode)) {
      setCountryCodeError(!countryCode ? 'A country code must be provided' : 'Country code must be numeric.');
      hasError = true;
    }

    if (!phoneNumber) {
      setPhoneNumberError('Phone number must be provided.');
      hasError = true;
    } else if (!/^\d+$/.test(phoneNumber)) {
      setPhoneNumberError('Phone number must be numeric.');
      hasError = true;
    }

    if (!documentPhoto) {
        setDocumentPhotoError("A picture must be provided");
        hasError = true;
    }

    if (documentPhoto && !documentPhoto.name.endsWith('.jpg')) {
      setDocumentPhotoError('Only .jpg files are allowed.');
      hasError = true;
    }

    if (hasError) {
      setGeneralError('Please correct the errors below.');
      return;
    }

    // Create patient object
    const newPatient = {
        id: Date.now(),
        name,
        email,
        countryCode,
        phoneNumber,
        documentPhoto: documentPhoto ? URL.createObjectURL(documentPhoto) : null,
    };  

    addPatient(newPatient);
    setSuccessMessage("Patient successfully registered!");
    setGeneralError('');
    setName('');
    setEmail('');
    setCountryCode('');
    setPhoneNumber('');
    setDocumentPhoto(null);
  };

  return (
    <div className="patient-form">
      {generalError && <div className="error">{generalError}</div>}
      {successMessage && <div className="success-box">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {<div className={`field-error ${nameError ? 'show' : ''}`}>{nameError}</div>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {<div className={`field-error ${emailError ? 'show' : ''}`}>{emailError}</div>}
        </div>

        <div className="phone-number">
          <div>
            <input
              type="text"
              placeholder="Country code"
              value={countryCode}
              maxLength={3}
              onChange={(e) => setCountryCode(e.target.value)}
            />
            {<div className={`field-error ${countryCodeError ? 'show' : ''}`}>{countryCodeError}</div>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {<div className={`field-error ${phoneNumberError ? 'show' : ''}`}>{phoneNumberError}</div>}
          </div>
        </div>

        <div>
          <input
            type="file"
            accept="image/jpeg"
            onChange={(e) => setDocumentPhoto(e.target.files ? e.target.files[0] : null)}
          />
          {<div className={`field-error ${documentPhotoError ? 'show' : ''}`}>{documentPhotoError}</div>}
        </div>

        <button type="submit">Add patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
