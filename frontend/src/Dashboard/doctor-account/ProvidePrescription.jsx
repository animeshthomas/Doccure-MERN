import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const ProvidePrescription = () => {
  // State to hold the list of medicines
  const [medicines, setMedicines] = useState([
    { name: '', dosage: '', frequency: '' },
  ]);

  // Function to handle changes to medicine inputs
  const handleMedicineChange = (index, event) => {
    const newMedicines = [...medicines];
    newMedicines[index][event.target.name] = event.target.value;
    setMedicines(newMedicines);
  };

  // Function to add a new medicine field
  const addMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', frequency: '' }]);
  };

  // Function to remove a medicine field
  const removeMedicine = index => {
    const newMedicines = [...medicines];
    newMedicines.splice(index, 1);
    setMedicines(newMedicines);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the medicines list to your backend here
    console.log('Medicines:', medicines);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Provide Prescription</h2>
      {medicines.map((medicine, index) => (
        <div key={index} className="medicine-entry">
          <input
            type="text"
            name="name"
            value={medicine.name}
            onChange={(event) => handleMedicineChange(index, event)}
            placeholder="Medicine Name"
            required
          />
          <input
            type="text"
            name="dosage"
            value={medicine.dosage}
            onChange={(event) => handleMedicineChange(index, event)}
            placeholder="Dosage"
            required
          />
          <input
            type="text"
            name="frequency"
            value={medicine.frequency}
            onChange={(event) => handleMedicineChange(index, event)}
            placeholder="Frequency"
            required
          />
          {medicines.length > 1 && (
            <button type="button" onClick={() => removeMedicine(index)}>
              <AiOutlineDelete />
            </button>
          )}
        </div>
      ))}
      <div className="actions">
        <button type="button" onClick={addMedicine}>Add Another Medicine</button>
        <button type="submit">Submit Prescription</button>
      </div>
    </form>
  );
};


export default ProvidePrescription;
