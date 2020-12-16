let setError = null
let setInfo = null

const setErrorSetter = setter => {setError = setter}
const setInfoSetter = setter => {setInfo = setter}
const error = (msg) => setError(msg)
const info = (msg) => setInfo(msg)

export default { setErrorSetter, setInfoSetter, error, info }