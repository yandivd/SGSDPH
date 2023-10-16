const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

export const fetchSinToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;

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

    const url = `${ baseUrl }/${ endpoint }`;

    console.log('esta es la data', data)

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.stringify( data )
            }
        });
    }else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }
}
