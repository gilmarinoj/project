(function () {
    const horas = document.querySelector("#horas");

    if (horas) {        
        const categoria = document.querySelector('[name="categoria_id"]');
        const dias = document.querySelectorAll('[name="dia"]');
        const inputHiddenDia = document.querySelector('[name="dia_id"]');
        const inputHiddenHora = document.querySelector('[name="hora_id"]');

        categoria.addEventListener("change", terminoBusqueda);
        dias.forEach((dia) => dia.addEventListener("change", terminoBusqueda));

        let busqueda = {
            categoria_id: +categoria.value || '',
            dia: +inputHiddenDia.value || '',
        };

        if (!Object.values(busqueda).includes('')) {

            (async () => {
                await buscarEventos();
                const id = inputHiddenHora.value

                // Mostrar la hora actual
                const horaSeleccionada = document.querySelector(`[data-hora-id="${id}"]`);

                horaSeleccionada.classList.remove('horas__hora--deshabilitado');
                horaSeleccionada.classList.add('horas__hora--seleccionado');

                horaSeleccionada.onclick = seleccionarHora;
            })()

        }

        function terminoBusqueda(e) {
            busqueda[e.target.name] = e.target.value;
            

            // Reiniciar campos ocultos y el selector de horas
            inputHiddenHora.value = '';
            inputHiddenDia.value = '';

            const horaPrevia = document.querySelector(".horas__hora--seleccionado");
            if (horaPrevia) {
                horaPrevia.classList.remove("horas__hora--seleccionado");
            }

            if (Object.values(busqueda).includes("")) {
                return;
            }

            buscarEventos();
        }

        async function buscarEventos() {
            const { dia, categoria_id } = busqueda;
            const url = `/api/eventos-horario?dia_id=${dia}&categoria_id=${categoria_id}`;

            const resultado = await fetch(url);
            const eventos = await resultado.json();            

            obtenerHorasDisponibles(eventos);
        }

        function obtenerHorasDisponibles(eventos) {
            // Reiniciar las horas
            const listadoHoras = document.querySelectorAll("#horas li");

            listadoHoras.forEach(li => li.classList.add('horas__hora--deshabilitado'));


            // Comprobar eventos

            const horasTomadas = eventos.map((evento) => evento.hora_id);
            const listadoHorasArray = Array.from(listadoHoras);

            const resultado = listadoHorasArray.filter(
                (hora) => {
                    return !horasTomadas.includes(hora.dataset.horaId)
                }
            );

            resultado.forEach(li => li.classList.remove('horas__hora--deshabilitado'));

            const horasDisponibles = document.querySelectorAll("#horas li:not(.horas__hora--deshabilitado)");
            horasDisponibles.forEach((hora) => {
                hora.addEventListener("click", seleccionarHora);
            });
        }

        function seleccionarHora(e) {
            // Quitar hora previamente seleccionada

            const horaPrevia = document.querySelector(".horas__hora--seleccionado");
            if (horaPrevia) {
                horaPrevia.classList.remove("horas__hora--seleccionado");
            }

            // Agregar clase seleccionado

            e.target.classList.add("horas__hora--seleccionado");

            inputHiddenHora.value = e.target.dataset.horaId;

            // Llenar el campo oculto de dia
            inputHiddenDia.value = document.querySelector('[name="dia"]:checked').value;
        }
    }
})();
