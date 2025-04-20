export const renderProfesor = (profesor) => {
  return {
    codigo: profesor.codigo,
    nombre: profesor.nombre,
    apellido: profesor.apellido,
    correo: profesor.correo,
    investigador: profesor.investigador,
    telefono: profesor.telefono,
    encargadoEscuela: profesor.encargadoEscuela,
  };
};

export const renderProfesores = (profesores) => {
  return profesores.map(renderProfesor);
};

export const profesorLayout = (profesor) => {
  return {
    status: "success",
    data: renderProfesor(profesor),
    message: "Profesor data retrieved successfully",
  };
};

export const profesoresLayout = (profesores) => {
  return {
    status: "success",
    data: renderProfesores(profesores),
    message: "Profesores data retrieved successfully",
  };
};

export const renderProfesorHTML = (profesor) => {
  return `
    <html>
      <head>
        <title>Profesor Details</title>
      </head>
      <body>
        <h1>Profesor: ${profesor.nombre} ${profesor.apellido}</h1>
        <p>Correo: ${profesor.correo}</p>
        <p>Investigador: ${profesor.investigador}</p>
        <p>Teléfono: ${profesor.telefono}</p>
        <p>Encargado de Escuela: ${profesor.encargadoEscuela}</p>
      </body>
    </html>
  `;
};

export const renderProfesoresHTML = (profesores) => {
  if (!Array.isArray(profesores)) {
    throw new TypeError("El parámetro 'profesores' debe ser un array");
  }

  if (profesores.length === 0) {
    return `
      <html>
        <head>
          <title>Profesores List</title>
        </head>
        <body>
          <h1>Lista de Profesores</h1>
          <p>No hay profesores disponibles.</p>
        </body>
      </html>
    `;
  }

  return `
    <html>
      <head>
        <title>Profesores List</title>
      </head>
      <body>
        <h1>Lista de Profesores</h1>
        <ul>
          ${profesores.map((profesor) => `<li>${profesor.nombre} ${profesor.apellido} - ${profesor.correo}</li>`).join("")}
        </ul>
      </body>
    </html>
  `;
};
