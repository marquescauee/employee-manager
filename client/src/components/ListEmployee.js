import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeService from '../services/EmployeeService';

function ListEmployee() {

    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await EmployeeService.getEmployees();

                setEmployees(response.data);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <div className='container mx-auto my-8'>
            <div className='h-12'>
                <button onClick={() => navigate("/addEmployee")} className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'>Add Employee</button>
            </div>

            <div className='flex shadow border-b'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6'>First Name</th>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6'>Last Name</th>
                            <th className='text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6'>Email</th>
                            <th className='text-right font-medium text-gray-700 uppercase tracking-wider py-3 px-6'>Actions</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody className='bg-white'>
                            {employees.map((employee) => (
                                <tr key={employee.employeeId}>
                                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-600'>{employee.firstName}</div>
                                    </td>
                                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-600'>{employee.lastName}</div>
                                    </td>
                                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-600'>{employee.email}</div>
                                    </td>
                                    <td className='text-right px-6 py-4 font-medium text-sm whitespace-nowrap'>
                                        <a className='text-indigo-600 hover:text-indigo-800 px-4' href='/'>Edit</a>
                                        <a className='text-red-600 hover:text-red-800' href='/'>Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}

export default ListEmployee