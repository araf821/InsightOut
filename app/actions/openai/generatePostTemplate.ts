const getPostTemplate = async (title: string) => {
  try {
    const response = await fetch(`/api/openai/generateTemplate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //@ts-ignore
        title: title,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    return null;
  }
};

export default getPostTemplate;
