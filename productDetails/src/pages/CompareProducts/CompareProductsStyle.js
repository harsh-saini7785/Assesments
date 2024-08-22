export const styles = {
    modalContainer: {
        maxHeight: '600px',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '4px', // Set the width of the scrollbar
            height: '4px'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888', // Set the color of the scrollbar thumb
            borderRadius: '10px', // Optionally, set the border radius of the scrollbar thumb
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555', // Set the color of the scrollbar thumb on hover
        },
    },
    addMoreButton: {
        marginTop: '10px'
    },
    backProductButton: {
        marginRight: '5px'
    },
    columnHeading: {
        display: 'flex',
        gap: '6px',
        alignItems: 'center'
    },
    notDataScreen: { textAlign: 'center', padding: '50px' }
}