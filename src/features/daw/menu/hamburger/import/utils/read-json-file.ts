export const readJSONFile = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', (event) => {
      const result = event.target?.result
      if (typeof result === 'string') {
        resolve(JSON.parse(result))
      } else {
        reject(new Error('Invalid file content'))
      }
    })

    reader.readAsText(file)
  })
}
