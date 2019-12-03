const filenameCity = '../data/cidades.json'
let datasCity = require(filenameCity)

const helper = require('../helpers/helper.js')
 
module.exports = {
    insertDataCity,
    getDatasCity,
    getDataCity, 
    updateDataCity,
    deleteDataCity
}

// CIDADES -------------------------------------
function getDatasCity() {
    return new Promise((resolve, reject) => {
        if (datasCity.length === 0) {
            reject({
                message: 'no datas available',
                status: 202
            })
        }
        resolve(datasCity)
    })
}

function getDataCity(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(datasCity, id)
        .then(dataCity => resolve(dataCity))
        .catch(err => reject(err))
    })
}

function insertDataCity(newDataCity) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(datasCity) }
        const date = { 
            data_criacao: helper.newDate(),
            data_atualizacao: helper.newDate()
        }
        newDataCity = { ...id, ...date, nome: newDataCity.nome, idEstado: parseInt(newDataCity.idEstado) }
        datasCity.push(newDataCity)
        helper.writeJSONFile(filenameCity, datasCity)
        resolve(newDataCity)
    })
}
 
function updateDataCity(id, newDataCity) { 
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(datasCity, id)
        .then(data => {  
            const index = datasCity.findIndex(p => p.id == data.id)
            id = { id: data.id } 
            
            const date = {
                data_atualizacao: helper.newDate()
            } 
            datasCity[index] = { ...id, ...date, nome: newDataCity.nome, idEstado: parseInt(newDataCity.idEstado) }
                       
            helper.writeJSONFile(filenameCity, datasCity)
            resolve(datasCity[index])
        })
        .catch(err => reject(err))
    })
}

function deleteDataCity(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(datasCity, id)
        .then(() => {           
            datasCity = datasCity.filter(function(item){
                return item.id!=id
            })
            helper.writeJSONFile(filenameCity, datasCity)             
            resolve()           
        })
        .catch(err => reject(err))
    })
}

// END - CIDADES -------------------------------------