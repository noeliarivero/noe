const url = "https://breakingbadapi.com/api/characters";
console.log(url)

$.get (url, (respuesta, estado) => {
    if ( estado == "success"){
        $('#api').prepend(`
                <img src="${respuesta[5].img}" width="180px"></img>
                <h6>${respuesta[5].name}</h6>    
                `)
    }
})

