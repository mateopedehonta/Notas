
$(()=>{
    const notas = []
    const almacenado = JSON.parse(localStorage.getItem('almacenado'))
    if(almacenado != null){
        almacenado.forEach(dato=>{
            notas.push(dato)
        })
    }
    mostrar(notas)

    $('#form').submit((e)=>{
        e.preventDefault()
        let hijos = $(e.target).children()
        notas.push(new nota(hijos[0].value,hijos[1].value))
        mostrar(notas)
    })
    $("#mostrarLista").click(function (e) { 
        e.preventDefault();
        $('#lista').slideToggle('fast')
    })

    class nota{
        constructor(titulo,nota){
            this.id = Date.now()
            this.titulo = titulo;
            this.notaText = nota;
        }
    }
    function mostrar (array){
        limpiarHTML(lista)
        array.forEach(nota =>{
            const {titulo,notaText,id} = nota;
            $('#lista').append(` 
            <li class="nota" id="${id}">
                <h2>${titulo}</h2>
                <p>${notaText}</p>
                <div class=btns>
                    <button class="btn editar"><i class="fas fa-edit"></i></button>
                    <button class="btn eliminar"><i class="fas fa-times"></i></button>
                </div>
            </li>
            `)
            $(`#${notas[notas.length - 1].id}`).css('display','none')
            $(`#${notas[notas.length - 1].id}`).fadeIn(1000)
        })
        json(array)
    }
    function eliminarNota(id){
        if( id !== ''){
            let num = 0
            notas.forEach(dato=>{
                if(dato.id == id){
                    $(`#${dato.id}`).fadeOut(999)
                    notas.splice(num,1)
                }
                num++
            })
            json(notas)
        }
    }
    function editarNota(id){
        if( id !== ''){
            notas.forEach(dato=>{
                if(dato.id == id){
                    // $('#tituloNota').value = nota.titulo
                    $('.boxForm').css('display','flex').append(`
                    <form id="formEdit">
                    <H2>Editar nota</H2>
                        <input type="text"  value="${dato.titulo}">
                        <input type="text"  value="${dato.notaText}">
                        <input type="submit" value="Guardar" >
                    </form>
                    `)
                    $('#formEdit').submit((e)=>{
                        e.preventDefault()
                        let hijos = $(e.target).children()
                        dato.titulo = hijos[1].value
                        dato.notaText = hijos[2].value
                        $('.boxForm').css('display','none')
                        mostrar(notas)
                        json(notas)
                        limpiarHTML(boxForm)
                    })
                }
            })
            
        }
    }
    
    function limpiarHTML (lista){
        while(lista.firstChild) {
            lista.removeChild(lista.firstChild);
        }
    }
    function json(array){
        const enJSON = JSON.stringify(array)
        localStorage.setItem('almacenado', enJSON)
    }
    $('#lista').on('click','.eliminar',function(e){
        eliminarNota(e.target.parentNode.parentNode.id);
    })
    $('#lista').on('click','.editar',function(e){
        editarNota(e.target.parentNode.parentNode.id)
    })
})
