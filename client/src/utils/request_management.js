export const request = async (url, options) => {
    try {
        return await fetch(`http://localhost:3000${url}`, options)
        .then(response => response.json())
        .catch(err => console.error(err));
    } catch (error) {
        console.log(error);
        return null;
    }
}