export async function loadEventsFromFiles(files: FileList): Promise<TVEvent[]> {
  // Create an array of Promises, one for each file
  const promises = Array.from(files).map(
    (file) =>
      new Promise<TVEvent[]>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const contents = e.target?.result; // This will contain the file contents

            // Parse the JSON and get the items array
            const items = JSON.parse(contents as string);

            // Resolve the Promise with the items array
            resolve(items);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = (e) => {
          console.error('File reading error', e);
          reject(e);
        };

        reader.readAsText(file); // Read the file as text
      }),
  );

  // Wait for all Promises to resolve
  const allItemsArrays = await Promise.all(promises);

  // Flatten the array of arrays to get a single array containing all items
  return allItemsArrays.flat();
}
