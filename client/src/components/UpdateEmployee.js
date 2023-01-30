import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployee = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const [employee, setEmployee] = useState({
        employeeId: id,
        firstName: '',
        lastName: '',
        email: '',
    });

    const [errors, setErrors] = useState([]);
    const [statusCode, setStatusCode] = useState(0);

    //Link inputs to states
    const handleChange = (e) => {

        const { name, value } = e.target;

        setEmployee({ ...employee, [name]: value })
    };

    //Function to update Employee
    const updateEmployee = async (e) => {
        e.preventDefault();

        try {
            setErrors((prevElement) => {
                return prevElement.splice(0, prevElement.length);
            });

            await EmployeeService.updateEmployee(id, employee);

            setStatusCode(201);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await EmployeeService.getEmployee(id);

                setEmployee(response.data);

            } catch(err) {
                console.log(err);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <div className='flex max-w-2xl mx-auto shadow border-b mt-6'>
                <div className='px-8 py-8'>

                    {statusCode === 400 && <p className='text-center mb-7 text-red-600 font-semibold bg-red-100 rounded p-2'>Invalid Credentials. Try again!</p>}

                    {statusCode === 201 && <p className='text-center mb-7 text-green-600 font-semibold bg-green-100 rounded p-2'>Employee updated Succesfully!</p>}

                    <div className='font-thin text-2xl tracking-wider'>
                        <h1>Update Employee</h1>
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
                        <button onClick={(e) => updateEmployee(e)} className='rounded text-white font-semibold bg-green-400 py-2 px-6 hover:bg-green-500'>Update</button>
                        <button onClick={() => navigate("/")}  className='rounded text-white font-semibold bg-red-400 py-2 px-6 hover:bg-red-500'>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployee