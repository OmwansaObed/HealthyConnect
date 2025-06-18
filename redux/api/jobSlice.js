import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staticData: {
    categories: [
      { value: "nursing", label: "Nursing" },
      { value: "medical-officer", label: "Medical Officer" },
      { value: "clinical-officers", label: "Clinical Officers" },
      { value: "lab-technician", label: "Lab Technician" },
      { value: "medical-technicians", label: "Medical Technicians" },
      { value: "coHo", label: "CoHo" },
      { value: "managerial", label: "Managerial" },
      { value: "pharmacy", label: "Pharmacy" },
      { value: "radiography", label: "Radiography" },
    ],
    jobTypes: [
      { value: "full-time", label: "Full Time" },
      { value: "part-time", label: "Part Time" },
      { value: "contract", label: "Contract" },
      { value: "internship", label: "Internship" },
    ],
    experienceLevels: [
      { value: "entry-level", label: "Entry Level" },
      { value: "mid-level", label: "Mid Level" },
      { value: "senior-level", label: "Senior Level" },
    ],
    salaryRanges: [
      { value: "0-50000", label: "KSh 0 - 50,000" },
      { value: "50000-100000", label: "KSh 50,000 - 100,000" },
      { value: "100000-150000", label: "KSh 100,000 - 150,000" },
      { value: "150000+", label: "KSh 150,000+" },
    ],
    locations: [
      { value: "nairobi", label: "Nairobi" },
      { value: "mombasa", label: "Mombasa" },
      { value: "kisumu", label: "Kisumu" },
      { value: "nakuru", label: "Nakuru" },
      { value: "eldoret", label: "Eldoret" },
    ],
  },
};

const jobSlice = createSlice({
  name: "jobStatic",
  initialState,
  reducers: {},
});

export default jobSlice.reducer;
