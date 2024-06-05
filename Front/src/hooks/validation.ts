interface LoginFormValues {
    name: string;
    password: string;
}

const validateLoginForm = (values: LoginFormValues) => {
    const errors: Partial<LoginFormValues> = {};

    // Validate 'name' as a username (e.g., must be at least 3 characters long)
    if (!values.name) {
        errors.name = 'Username is required';
    } else if (values.name.length < 3) {
        errors.name = 'Username must be at least 3 characters long';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }

    return errors;
};

export default validateLoginForm;