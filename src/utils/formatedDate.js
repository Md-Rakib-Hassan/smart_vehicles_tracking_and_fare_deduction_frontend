const formatedDate = (dateObj) => {
    const day = dateObj?.getDate();
    const month = dateObj?.getMonth();
    const year = dateObj?.getFullYear();
    return `${day}-${month+1}-${year}`
}
  
export default formatedDate;