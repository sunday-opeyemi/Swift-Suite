import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
// import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { handleNextStep } from '../redux/vendor'
import { useDispatch, useSelector } from 'react-redux'




const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


const Schema = yup.object().shape({
    Phone: yup.string().matches(phoneRegExp, 'Invalid phone').required(),
    Email: yup.string().email().required(),
    Name: yup.string().required()
})


const vendorenrolment = () => {
    const store = useSelector(state => state.vendor.vendorData)
    console.log(store);


    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(Schema)
    })

    const dispatch = useDispatch()
    const onSubmit = (data) => {
        let form = { ...store, ...data }
        console.log(form);
        dispatch(handleNextStep(form))
    }

    // useEffect(() => {
    //     if (store) {
    //         setValue("Name", store.Name)
    //         setValue("Email", store.Email)
    //         setValue("Phone", store.Phone)

    //     }
    // }, [])
  return (
    <section className='bg-blue-100 h-screen'>
    </section>
  )
}

export default vendorenrolment