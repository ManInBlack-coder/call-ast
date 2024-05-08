function Validation(values) {
    let error = {}
    
    
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  
    const pass_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/


    if(values.name === '') {
        error.name = 'name should not be empty'
    }

    else {
        error.name = ''
    }



    if(values.email === '') {
        error.email = 'name should be empty'
    }

    else if(!email_pattern.test(values.email)) {
        error.email = 'email did not match'
    } else {
        error.email = ''
    }

    if(values.password === '') {
        error.password = 'password should not be empty'
    }

    else if(!pass_pattern.test(values.password)) {
        error.password = 'pass did not match'
    } else {
        error.password = ''
    }
    return error;
}

export default Validation