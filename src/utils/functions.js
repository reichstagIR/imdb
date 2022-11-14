export const shorter = (title = "") => {
    const shorterTitle = title.slice(0 , 23)
    if(title.length > shorterTitle.length ) return shorterTitle + " ...";
    return shorterTitle;
}
export const capitalizeFirstLetter = (array) => {
    return array.map(item => item.charAt(0).toUpperCase() + item.slice(1));
}