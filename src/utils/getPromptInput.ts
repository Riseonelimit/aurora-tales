const getPromptInput = (
  keywords: string[],
  genres: string,
  additional: string | null,
) => {
  return `Using the provided keywords ${keywords.join(", ")} and the genre: ${genres}, craft a single captivating story. The story should stay true to the genre's essence while seamlessly integrating the keywords into a well-structured narrative include realistic names for people and places. Include vivid descriptions, engaging characters, and an imaginative plot with a clear beginning, middle, and end. Ensure the tone and style match the genre specified. Give a meaningful title and use simple english and try to relate to real world reference when possible dont make it too much out of tone. I will mention any additional things if any after this ${additional}`;
};
export default getPromptInput;
