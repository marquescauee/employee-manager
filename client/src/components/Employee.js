import React from 'react'
import { useNavigate } from 'react-router-dom'

const Employee = ({employee, deleteEmployee}) => {

    const navigate = useNavigate();

    const editEmployee = (e, employeeId) => {
        e.preventDefault();
        navigate(`/editEmployee/${employeeId}`);
    }

    return (
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
                <a className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer' onClick={(e) => editEmployee(e, employee.employeeId)}>Edit</a>
                <a className='text-red-600 hover:text-red-800 hover:cursor-pointer' onClick={(e) => deleteEmployee(e, employee.employeeId)}>Delete</a>
            </td>
        </tr>
    )
}

export default Employee