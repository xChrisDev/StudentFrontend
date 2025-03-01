export const getStudents = async (URI) => {
  const response = await fetch(URI);
  const data = await response.json();
  return data;
};

export const updateStudent = async (URI, input) => {
  const response = await fetch(URI, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: input,
  });
  const data = await response.json();
  return data;
};

export const addStudent = async (URI, input) => {
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: input,
  });
  const data = await response.json();
  return data;
};

export const deleteStudent = async (URI) => {
  const response = await fetch(URI, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};
