export const formatDateTime = (dateTime: Date | undefined) => {
    if (dateTime) {
        const dateObject = new Date(dateTime);
        return dateObject.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        });
    } else {
        return '';
    }
};
