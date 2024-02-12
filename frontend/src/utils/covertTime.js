const convertTime = (time) => {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    let ti = 'AM';
    
    if (hours === 0) {
        hours = 12;
    } else if (hours === 12) {
        ti = 'PM';
    } else if (hours > 12) {
        ti = 'PM';
        hours -= 12;
    }

    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${formattedHours}:${formattedMinutes} ${ti}`;
}

export default convertTime;
