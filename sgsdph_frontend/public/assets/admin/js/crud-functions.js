function eliminarElemento(id, url, elemento) {
    Swal.fire({
        "title": `Estás seguro que desea ELIMINAR a este ${elemento}?`,
        "icon": "question",
        "showCancelButton": true,
        "cancelButtonText": "No, Cancelar",
        "confirmButtonText": "Si, Eliminar",
        "reverseButtons": true,
        "confirmButtonColor": "#d33"
    })
    .then(function(result){
        if (result.isConfirmed){
            window.location.href = url + id + "/"
        }
    })
}