(function () {

    const ponentesInput = document.querySelector('#ponentes');

    if (ponentesInput) {
        let ponentes = [];
        let ponentesFiltrados = [];

        const listadoPonentes = document.querySelector('#listado-ponentes');
        const ponenteHidden = document.querySelector('[name="ponente_id"]');

        obtenerPonentes();

        ponentesInput.addEventListener('input', buscarPonentes);

        if(ponenteHidden.value){
            (async() => {
                const ponente = await obtenerPonente(ponenteHidden.value);

                const ponenteHTML = document.createElement('li');
                ponenteHTML.classList.add('listado-ponentes__ponente', 'listado-ponentes__ponente--seleccionado');
                ponenteHTML.textContent = `${ponente.nombre} ${ponente.apellido}`;
                
                listadoPonentes.appendChild(ponenteHTML);
            })()
        }


        async function obtenerPonentes() {
            const url = `/api/ponentes`;

            const request = await fetch(url);
            const response = await request.json();

            formatearPonentes(response);
        }

        async function obtenerPonente(id) {
            const url = `/api/ponente?id=${id}`;
            const request = await fetch(url);
            const response = await request.json();
            return response;
        }

        function formatearPonentes(arrayPonentes = []) {
            ponentes = arrayPonentes.map(ponente => {
                return {
                    nombre: `${ponente.nombre.trim()} ${ponente.apellido.trim()}`,
                    id: ponente.id,
                }
            });

        }

        function buscarPonentes(e) {
            const busqueda = e.target.value.trim();

            if (busqueda.length > 1) {
                const expresion = new RegExp(busqueda, 'i');

                ponentesFiltrados = ponentes.filter(ponente => {
                    if (ponente.nombre.toLowerCase().search(expresion) != -1) {
                        return ponente;
                    }
                });
            } else {
                ponentesFiltrados = [];
            }

            mostrarPonentes();
        }

        function mostrarPonentes() {

            while (listadoPonentes.firstChild) {
                listadoPonentes.removeChild(listadoPonentes.firstChild);
            }

            if (ponentesFiltrados.length > 0) {
                ponentesFiltrados.forEach(ponente => {
                    const ponenteHTML = document.createElement('li');
                    ponenteHTML.classList.add('listado-ponentes__ponente')
                    ponenteHTML.textContent = ponente.nombre;
                    ponenteHTML.dataset.ponenteId = ponente.id;
                    ponenteHTML.onclick = seleccionarPonente

                    // Agregar al DOM
                    listadoPonentes.appendChild(ponenteHTML);
                })
            } else {
                const noPonentes = document.createElement('p');
                noPonentes.classList.add('listado-ponentes__no-ponente');
                noPonentes.textContent = 'No hay ponentes que concuerden con tu busqueda';

                listadoPonentes.appendChild(noPonentes);
            }


        }

        function seleccionarPonente(e) {
            const ponente = e.target;

            // Remover la clase previa
            const ponentePrevio = document.querySelector('.listado-ponentes__ponente--seleccionado')
            if(ponentePrevio) {
                ponentePrevio.classList.remove('listado-ponentes__ponente--seleccionado')
            }

            ponente.classList.add('listado-ponentes__ponente--seleccionado')

            ponenteHidden.value = ponente.dataset.ponenteId;
        }

    }

})();