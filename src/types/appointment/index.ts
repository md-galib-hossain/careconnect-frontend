export type TAppointment = {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  doctorSchedulesDoctorId: string | null;
  doctorSchedulesScheduleId: string | null;
  doctor: {
    doctorSpecialties: {
      specialties: {
        title: string;
      };
    }[];
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: string;
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    averageRating: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  patient: {
    id: string;
    email: string;
    name: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  doctorSchedules: {
    doctorId: string;
    scheduleId: string;
    isBooked: boolean;
    appointmentId: string;
    createdAt: string;
    updatedAt: string;
    schedule: {
      id: string;
      startDateTime: any;
      endDateTime: any;
      createdAt: string;
      updatedAt: string;
    };
  };
};
