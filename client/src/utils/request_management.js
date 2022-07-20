export const request = async (url, options) => {
    return await fetch(`http://localhost:3000${url}`, options)
    .then(response => response.json())
    .catch(err => console.error(err));
}