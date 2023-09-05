// La fecha del día en la zona del cliente web
    // usando el objeto Date de JavaScript
    var fechaHoy = new Date();

    // Estableciendo referencia para el título de la página
    var title = document.getElementById('pagetitle');

    // Cálculo del desfase en el huso horario para hacer
    // luego el ajuste con la zona horaria seleccionada
    // en el elemento select del formulario
    var desfase = -(Math.round(fechaHoy.getTimezoneOffset()/60)) + 12;

    // Registrar evento click del ratón al presionar botones de envío
    function iniciar() {
      var select = document.getElementById("zhselect");
      if (select.addEventListener) {
        select.addEventListener("change", getHoraLocal, false);
      } else if (select.attachEvent) {
        select.attachEvent("onchange", getHoraLocal);
      }
    }

    // Función getHoraLocal()
    // Calcula la hora en la zona horaria seleccionada
    function getHoraLocal() {
      var fechaHoy = new Date();
      // Ajustar el desfase horario respecto a la zona seleccionada.
      // Por ejemplo, la zona horaria para América Central está
      // en el índice 6 de la colección de opciones del elemento select.
      // Si un usuario seleccionara la zona horaria de Tokio que está
      // en el índice 21 de la colección, el cálculo se realizaría así:
      // 21 - desfase del cliente (zona horaria de América Central) = 15
      var zh = document.zonahoraria.zonas.selectedIndex - desfase;
      // Sumar (o restar) las horas de desfase respecto a la hora
      // local del cliente
      fechaHoy.setHours(fechaHoy.getHours() + zh);
      // Informar la hora local del huso horario elegido
      title.innerHTML = "Zona horaria de " +
        document.zonahoraria.zonas.options[document.zonahoraria.zonas.selectedIndex].text;
      document.zonahoraria.hour.value = fechaHoy.toLocaleString();
    }

    // Asociando función que manejará el evento load al cargar la página
    if (window.addEventListener) {
      window.addEventListener("load", iniciar, false);
    } else if (window.attachEvent) {
      window.attachEvent("onload", iniciar);
    }