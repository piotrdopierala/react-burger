const checkValidation = (value, rules) => {
    if (!rules) {
        return true;
    }
    if (rules.required) {
        if (value.trim() === '')
            return false;
    }
    if (rules.minLength) {
        if (value.trim().length < rules.minLength)
            return false;
    }
    if (rules.maxLength) {
        if (value.trim().length > rules.maxLength)
            return false;
    }
    if (rules.contains) {
        for (let searchedChars of rules.contains) {
            if (!value.includes(searchedChars)) {
                return false;
            }
        }
    }
    return true;
}

export default checkValidation;