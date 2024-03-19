import { createSlice } from '@reduxjs/toolkit'


const initialData = () => {
    //  after setting d ifo in our reducer we will collect it and pass it along
    const item = window.localStorage.getItem('vendor')
    //** Parse stored json or if none return initialValue
    return item ? JSON.parse(item) :
        {
            currentStep: 0,

            vendorName: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',

            host: '',
            ftpusername: '',
            ftppassword: '',


            accountnumber: '',
            dealername: '',
            dealerzip: '',


            productChecked: [],
            categoryChecked: [],
            brandChecked: [],

            percentagemarkup: '',
            fixedmarkup: '',
            shippingcost: '',
            stockminimum: '',
            stockmaximum: '',
            costaverage: '',
            inventory: '',
            order: '',
            tracking: '',
        }

}

export const slice = createSlice({
    name: 'gameplan',
    initialState: {
        vendorData: initialData()
    },
    // it work like usestate. for rendering and re-rendering purpose(REDUCERS)
    reducers: {
        handleNextStep: (state, action) => {
            state.vendorData = { ...state.vendorData, ...action.payload }
            state.vendorData.currentStep++
            localStorage.setItem("vendor", JSON.stringify(state.vendorData))
        },

        handlePlanLength: (state, action) => {
            state.vendorData.planLength = action.payload
        },

        handlePreviousStep: (state, action) => {
            state.vendorData.currentStep--
        },

        // the state will b changing by one i.e the currentstep will change either increase or decreaes by 1
        handleChange: (state, action) => {
            state.vendorData.currentStep = 1
        },

        // once u click confirm it will chage the step by one
        handleConfirm: (state, action) => {
            state.vendorData.currentStep++
        }
    }
})
export const { handleNextStep, handlePlanLength, handlePreviousStep, handleChange, handleConfirm } = slice.actions

export default slice.reducer