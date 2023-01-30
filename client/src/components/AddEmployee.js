import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const AddEmployee = () => {

    //UseNavigate
    const navigate = useNavigate();
    
    //UseStates
    const [errors, setErrors] = useState([]);
    const [statusCode, setStatusCode] = useState(0);

    const [employee, setEmployee] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        email: '',
    });

    //Link inputs to states
    const handleChange = (e) => {

        const { name, value } = e.target;

        setEmployee({ ...employee, [name]: value })
    };

    //Save Employee
    const saveEmployee = async (e) => {

        e.preventDefault();

        try {
            setErrors((prevElement) => {
                return prevElement.splice(0, prevElement.length);
            });

            await EmployeeService.saveEmployee(employee);

            setStatusCode(201);

            clearFields();

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {

            const requestErrors = err.response.data.errors;

            let tempErrors = errors;

            for (let err of requestErrors) {
                tempErrors.push(err.defaultMessage);
            }

            console.log(tempErrors);

            setErrors(tempErrors);
            setStatusCode(400);

        } 
    }

    //Clear fields after saving successfully
    const clearFields = () => {
        let tempEmployee = employee;

        tempEmployee.email = '';
        tempEmployee.firstName = '';
        tempEmployee.lastName = '';
        tempEmployee.employeeId = '';

        setEmployee({ ...employee, tempEmployee });
    }

    return (
        <>
            <div className='flex max-w-2xl mx-auto shadow border-b mt-6 justify-center'>
                <div className='px-8 py-8'>

                    {statusCode === 400 && <p className='text-center mb-7 text-red-600 font-semibold bg-red-100 rounded p-2'>Invalid Credentials. Try again!</p>}

                    {statusCode === 201 && <p className='text-center mb-7 text-green-600 font-semibold bg-green-100 rounded p-2'>Employee created Succesfully!</p>}

                    <div className='font-thin text-2xl tracking-wider'>
                        <h1>Add new Employee</h1>
                    </div>
                    <div className='items-center justify-center h-14 w-full my-4'>
                        <label className='block text-gray-600 text-sm font-normal'>First Name:</label>

                        <input value={employee.firstName} name='firstName' onChange={(e) => handleChange(e)} type='text' className={errors !== null && errors.includes('First name cannot be empty') ? 'errorBorder' : 'saveEmployeeInputs'}></input>
                    </div>

                    {errors !== null && errors.includes('First name cannot be empty') && <p className='text-red-600 font-semibold text-sm'>First name cannot be empty.</p>}

                    <div className='items-center justify-center h-14 w-full my-4'>
                        <label className='block text-gray-600 text-sm font-normal'>Last Name:</label>
                        <input value={employee.lastName} type='text' name='lastName' onChange={(e) => handleChange(e)} className={errors !== null && errors.includes('Last name cannot be empty') ? 'errorBorder' : 'saveEmployeeInputs'}></input>
                    </div>

                    {errors !== null && errors.includes('Last name cannot be empty') && <p className='text-red-600 font-semibold text-sm'>Last name cannot be empty.</p>}

                    <div className='items-center justify-center h-14 w-full my-4'>
                        <label className='block text-gray-600 text-sm font-normal'>Email:</label>
                        <input value={employee.email} type='email' name='email' onChange={(e) => handleChange(e)} className={errors !== null && errors.includes('email cannot be empty') ? 'errorBorder' : 'saveEmployeeInputs'}></input>
                    </div>

                    {errors !== null && errors.includes('email cannot be empty') && <p className='text-red-600 font-semibold text-sm'>Email cannot be empty.</p>}

                    <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                        <button onClick={(e) => saveEmployee(e)} className='rounded text-white font-semibold bg-green-400 py-2 px-6 hover:bg-green-500'>Save</button>
                        <button onClick={clearFields} className='rounded text-white font-semibold bg-red-400 py-2 px-6 hover:bg-red-500'>Clear</button>
                    </div>
                </div>
            </div>
            <div className='h-12 max-w-2xl mx-auto text-right mt-6'>
                <button onClick={() => navigate("/")} className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'>Back to home</button>
            </div>
        </>
    )
}

export default AddEmployee