import React, { useState } from 'react';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL, token } from '../../config';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const ViewAllDoctors = () => {
    const { data, loading, error } = useGetProfile(BASE_URL + '/doctors/');
    const [isLoading, setIsLoading] = useState(false);
    const [doctorId, setDoctorId] = useState('');

    const deleteDoctorHandler = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/doctors/reject/${doctorId}`, {
                method: 'put',
            });
            const data = await response.json();
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Something went wrong');
            }
            window.location.reload();
            toast.success(data.message);
        } catch (error) {
            toast.error('Please try again later');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfirmation = (doctorId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this doctor?');
        if (isConfirmed) {
            setDoctorId(doctorId);
            deleteDoctorHandler();
        }
    };

    return (
        <div>
            <br></br>
            <br></br>
            {loading && <Loading />}
            {error && <Error errMessage={error} />}
            {!loading && !error && data && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Photo
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rating
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Hospital Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Specialization
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map(item => (
                                <tr key={item?._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={item?.photo} alt="User Logo" className="h-10 w-10 rounded-full" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item?.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900"> {item.averageRating.toFixed(2)}({item.totalRating})</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.experiences && item.experiences[0]?.hospital}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item?.specialization.toUpperCase()}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div
                                            onClick={() => handleDeleteConfirmation(item._id)} // Pass doctorId
                                            className="bg-red-500 text-white p-2 rounded-md inline-block flex items-center cursor-pointer"
                                        >
                                            <AiOutlineDelete className="mr-2" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ViewAllDoctors;
