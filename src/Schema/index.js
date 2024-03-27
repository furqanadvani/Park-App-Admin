import  * as Yup from 'yup'



export const LoginSchema = Yup.object({
    email: Yup.string().email().required("Please Enter Your Email..."),
    password : Yup.string().required("Please Enter Your Password")
})


export const AddParkSchema = Yup.object({
    name : Yup.string().required("Please enter a park title....."),
    description : Yup.string().required("please enter a park descpition..."),
    starttime : Yup.string().required("please enter a park starting time..."),
    endtime : Yup.string().required("please enter a park ending time..."),
    city : Yup.string().required("please enter city..."),
    country : Yup.string().required("please enter Country..."),
    cost : Yup.string().required("please enter cost..."),
    capacity : Yup.string().required("please enter capicity..."),
    location : Yup.string().required("please enter Address..."),
    images: Yup.array().required('Images are required').default([]),
})


export const chckScehma = Yup.object({
    name : Yup.string().required("Please enter a park title....."),
    description : Yup.string().required("please enter a park descpition..."),
})


export const updateUserSchema = Yup.object({
    firstname :  Yup.string().required("Please enter a firstname....."),
    lastname :  Yup.string().required("Please enter a lastname....."),
    phonenumber :  Yup.string().required("Please enter a phonenumber....."),
})


export const createUserSchema = Yup.object({
    firstname : Yup.string().required("Please Enter Your Firstname.."),
    lastname : Yup.string().required("Please Enter Your LastName.."),
    email : Yup.string().email().required("Please Enter Your EmailAddress"),
    phonenumber : Yup.string().required("Please Enter Your Phone Number"),
    password : Yup.string().min(6).max(20).required("Create Your password"),
    Confirm_Password:  Yup.string().required().oneOf([Yup.ref("password"), null , "password must match"]),

})
export const CreateAdminSchema = Yup.object({
    firstname : Yup.string().required("Please Enter Your Firstname.."),
    lastname : Yup.string().required("Please Enter Your LastName.."),
    email : Yup.string().email().required("Please Enter Your EmailAddress"),
    password : Yup.string().min(6).max(20).required("Create Your password"),
    Confirm_Password:  Yup.string().required().oneOf([Yup.ref("password"), null , "password must match"]),

})
export const updateAdminSchema = Yup.object({
    firstname :  Yup.string().required("Please enter a firstname....."),
    lastname :  Yup.string().required("Please enter a lastname....."),
    password : Yup.string().min(6).max(20).required("Create Your password"),
    // phonenumber :  Yup.string().required("Please enter a phonenumber....."),
})


export const UpdateParkSchema = Yup.object({
    name : Yup.string().required("Please enter a park title....."),
    description : Yup.string().required("please enter a park descpition..."),
    starttime : Yup.string().required("please enter a park starting time..."),
    endtime : Yup.string().required("please enter a park ending time..."),
    city : Yup.string().required("please enter city..."),
    country : Yup.string().required("please enter Country..."),
    cost : Yup.string().required("please enter cost..."),
    capacity : Yup.string().required("please enter capicity..."),
    location : Yup.string().required("please enter Address..."),
})