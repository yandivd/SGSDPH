const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }${ endpoint }`;

    console.log('esta es la url',data)


    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

export const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                Authorization: `Token ${data}`
            }
        });
    }
}
