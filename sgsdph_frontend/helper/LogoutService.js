export const LogoutService = ( endpoint, token, method  ) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_HOST;
    const url = `${ baseUrl }/${ endpoint }`;

    return fetch( url, {
        method,
        headers: {
            Authorization: `Token ${token}`
        },
        body: null
    });

}