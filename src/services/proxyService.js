import data from './data.json'

export default {
    getProxiesList() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data)
            }, 200)
        })
    }
}