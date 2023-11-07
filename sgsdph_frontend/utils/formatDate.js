export const formatDate = (fecha) => {
    if(fecha){
    const dateTime = new Date(fecha)

    const day = dateTime.getDate().toString().padStart(2, '0')
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0')
    const year = dateTime.getFullYear().toString().slice(-2)
    const formatedDate = `${day}-${month}-${year}`

    return formatedDate
    } else{
        return '';
    }
}