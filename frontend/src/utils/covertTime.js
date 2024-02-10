const convertTime = (time) => {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    let ti = 'am';
    if (hours > 12) {
        ti = 'pm';
        hours = hours - 12;
    }
    return `${hours}:${minutes} ${ti}`;
}

export default convertTime;
// come back