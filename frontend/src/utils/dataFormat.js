export default function dataFormat(date) {
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth() + 1
    const year = new Date(date).getFullYear()
    const newDate = `${day}/${month}/${year}`
    return newDate
}