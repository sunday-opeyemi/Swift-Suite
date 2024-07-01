import { createSlice } from '@reduxjs/toolkit'


const initialData = () => {
    //  after setting d ifo in our reducer we will collect it and pass it along
    const item = window.localStorage.getItem('vendor')
    //** Parse stored json or if none return initialValue
    return item ? JSON.parse(item) :
        {
            currentStep: 0,
            vendor_name: '',
            address_street1: '',
            address_street2: '',
            city: '',
            postal_code: '',
            country: '',
            state: '',
            // currentStep: 0,

            // vendor_name: '',

            // vendor_name: '',
            // street1: '',
            // street2: '',
            // city: '',
            // postalCode: '',
            // selectedCountry: '',
            // selectedState : '',

            // host: '',
            // ftpusername: '',
            // ftppassword: '',


            // accountnumber: '',
            // dealername: '',
            // dealerzip: '',


            // productChecked: [],
            // categoryChecked: [],
            // brandChecked: [],

            // percentagemarkup: '',
            // fixedmarkup: '',
            // shippingcost: '',
            // stockminimum: '',
            // stockmaximum: '',
            // costaverage: '',
            // inventory: '',
            // order: '',
            // tracking: '',
        }

}

export const slice = createSlice({
    name: 'gameplan',
    initialState: {
        vendorData: initialData(),
        product: [],
        productId: null,
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
        },


        addToProduct: (state, payload) => {
            state.product.push(payload.payload)
            // productItem = product.find = (item) => item.id == action.id
            console.log(payload.payload);
        },

        increment: (state, action) => {
            let productItem = state.product.find ((item) => item.id === action.payload) 
            console.log(productItem)
            productItem.cartQuantity +=1
        },

        decrement: (state, action) => {
            let productItem = state.product.find ((item) => item.id === action.payload)
            console.log(productItem);
            productItem.cartQuantity > 1 ? productItem.cartQuantity -=1 : 0
        },

        remove: (state, action) =>{
            state.productItem.splice (action.payload, 1)
        },
        setProductId: (state, action) => {  // New reducer to set the product ID
            state.productId = action.payload;
            // console.log(action.payload);
        },
        setVendorName: (state, action) => {
            // here, we receive vendor_name that is in localstorage
            state.vendorData.vendor_name = action.payload;
            // console.log(action.payload);
            // localStorage.setItem('vendor', JSON.stringify(state.vendorData)); // Update localStorage
        },
        userId: (state, action) => {
            // here, we receive vendor_name that is in localstorage
            state.vendorData.userId = action.payload;
            console.log(action.payload);
            // localStorage.setItem('vendor', JSON.stringify(state.vendorData)); // Update localStorage
        },
    },
})
export const { handleNextStep, handlePlanLength, handlePreviousStep, handleChange, handleConfirm, addToProduct, increment, decrement, remove, setProductId, setVendorName, userId } = slice.actions

export default slice.reducer