export interface PatientData {
    name: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    documentPhoto: File | null;
  }
  
export interface ErrorResponse {
    message: string;
    code?: string;
    response?: {
      data?: {
        message?: string;
      };
    };
  }
  