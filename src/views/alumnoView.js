export const renderAlumno = (alumno) => {
  return {
    id: alumno.id,
    nombre: alumno.nombre,
    email: alumno.email,
    carrera: alumno.carrera,
    // Add other fields as needed
  };
};

export const renderAlumnos = (alumnos) => {
  return alumnos.map(renderAlumno);
};

export const alumnoLayout = (alumno) => {
  return {
    status: "success",
    data: renderAlumno(alumno),
    message: "Alumno data retrieved successfully",
  };
};

export const alumnosLayout = (alumnos) => {
  return {
    status: "success",
    data: renderAlumnos(alumnos),
    message: "Alumnos data retrieved successfully",
  };
};

export const renderAlumnoHTML = (alumno) => {
  return `
    <html>
      <head>
        <title>Alumno Details</title>
      </head>
      <body>
        <h1>Alumno: ${alumno.nombre}</h1>
        <p>Email: ${alumno.email}</p>
        <p>Carrera: ${alumno.carrera}</p>
      </body>
    </html>
  `;
};

export const renderAlumnosHTML = (alumnos) => {
  return `
    <html>
      <head>
        <title>Alumnos List</title>
      </head>
      <body>
        <h1>Lista de Alumnos</h1>
        <ul>
          ${alumnos.map((alumno) => `<li>${alumno.nombre} - ${alumno.email}</li>`).join("")}
        </ul>
      </body>
    </html>
  `;
};
