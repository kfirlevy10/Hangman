// Syncronous - blocking the user from doing anything until the program is finished, doing one thing at a time
// Asynchronous - doing multiple actions at once, allowing the user freedom until the program is finished

const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)  // without using http/https, the domain will use the protocol of the website it is deployed in

    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    }
    else {
        throw new Error('Unable to fetch puzzle')
    }
}


const getCountry = async (countryCode) => {
    const response = await fetch('//restcountries.eu/rest/v2/all')

    if(response.status === 200) {
        const data = await response.json()
        return data.find((country) => country.alpha2Code === countryCode)
    }
    else {
        throw new Error('Unable to fetch data')
    }
}

const getLocation = async () => {
    const response = await fetch('//ipinfo.io/json?token=5a94192fa8255a')

    if(response.status === 200) {
        const data = await response.json()
        return data
    }
    else {
        throw new Error('Unable to fetch location')
    }
}

/* const getCurrentCountry = async () => {
    const location = await getLocation()
    return getCountry(location.country)  // no reason to await something in order to return it - return always waits for a fulfillment anyways
} */