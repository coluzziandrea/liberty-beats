export const readJSONFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        try {
          const jsonRes = JSON.parse(result)
          resolve(jsonRes)
        } catch (error) {
          reject(new Error('Invalid JSON content'))
        }
      } else {
        reject(new Error('Invalid file content'))
      }
    })

    reader.addEventListener('error', (event) => {
      reject(new Error('Error reading file'))
    })

    reader.readAsText(file)
  })
}
