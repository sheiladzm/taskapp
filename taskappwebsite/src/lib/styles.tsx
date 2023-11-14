export const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const dashboardBoxStyle = {
    height: 700,
    width: '100%',
    '& .actions': {
        color: 'text.secondary',
    },
    '& .textPrimary': {
        color: 'text.primary',
    },
};
