export const getStudents = async (URI) => {
  const response = await fetch(URI);
  const data = await response.json();
  return data;
};

export const updateStudent = async (URI, input) => {
  const response = await fetch(URI, {
    method: "PUT",
    body: input,
  });
  const data = response.json();
  return data;
};

export const addStudent = async (URI, input) => {
  const response = await fetch(URI, {
    method: "POST",
    body: input,
  });
  const data = response.json();
  return data;
};

export const deleteStudent = async (URI) => {
  const response = await fetch(URI, {
    method: "DELETE",
  });
  const data = response.json();
  return data;
};
