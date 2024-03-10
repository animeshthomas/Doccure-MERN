import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { BASE_URL, getUserId, token } from "../../config";

const ProvidePrescription = () => {
  const { userid } = useParams(); 
    const doctor = getUserId();
    console.log("UserId",userid,"DoctorId", doctor)
    const [formData, setFormData] = useState({
        doctor: doctor,
        patient: userid,
        prescriptions: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/prescriptions/provide`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            console.log(res)
            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success(result.message);
        } catch (err) {
            toast.error('Failed to send prescription: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }));
    };

    const handleInputChange = (key, event, index) => {
        const { name, value } = event.target;
        setFormData(prevFormData => {
            const updatedItems = [...prevFormData[key]];
            updatedItems[index][name] = value;
            return { ...prevFormData, [key]: updatedItems };
        });
    };

    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index)
        }));
    };

    const addPrescription = (e) => {
        e.preventDefault();
        addItem('prescriptions', { medicine: "", noofdays: "", dosage: "", frequency: "" });
    };

    const handlePrescriptionChange = (event, index) => {
        handleInputChange('prescriptions', event, index);
    };

    const deletePrescription = (e, index) => {
        e.preventDefault();
        deleteItem('prescriptions', index);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10 text-center">
        Send Prescriptions
    </h2>
            <form onSubmit={SubmitHandler}>
                {/* Prescription Inputs */}
                {formData.prescriptions.map((prescription, index) => (
                    <div key={index} className="mb-5">
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <p className="form__label">Medicine*</p>
                                <input
                                    type="text"
                                    name='medicine'
                                    value={prescription.medicine}
                                    className='form__input'
                                    onChange={(e) => handlePrescriptionChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form__label">No. of Days*</p>
                                <input
                                    type="text"
                                    name='noofdays'
                                    value={prescription.noofdays}
                                    className='form__input'
                                    onChange={(e) => handlePrescriptionChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form__label">Dosage*</p>
                                <input
                                    type="text"
                                    name='dosage'
                                    value={prescription.dosage}
                                    className='form__input'
                                    onChange={(e) => handlePrescriptionChange(e, index)}
                                />
                            </div>
                            <div>
                                <p className="form__label">Frequency*</p>
                                <input
                                    type="text"
                                    name='frequency'
                                    value={prescription.frequency}
                                    className='form__input'
                                    onChange={(e) => handlePrescriptionChange(e, index)}
                                />
                            </div>
                        </div>
                        <button onClick={e => deletePrescription(e, index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
                    </div>
                ))}
                <button
                    onClick={addPrescription}
                    className='bg-[#000] p-2 px-5 rounded text-white h-fit cursor-pointer'
                >Add Prescription</button>

                <div className="mt-7">
                    <button
                        type="submit"
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        disabled={isLoading}
                    >
                        {isLoading ? <HashLoader color="#ffffff" loading={isLoading} size={20} /> : 'Provide Prescription'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProvidePrescription;
