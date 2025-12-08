
export const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age > 0 ? age : 0;
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.toLocaleTimeString(undefined, options);
}
