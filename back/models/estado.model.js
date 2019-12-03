const filename = '../data/estados.json'
let datas = require(filename)
const helper = require('../helpers/helper.js')
 
module.exports = {
    insertData,
    getDatas,
    getData, 
    updateData,
    deleteData
}


// ESTADOS -------------------------------------
function getDatas() {
    return new Promise((resolve, reject) => {
        if (datas.length === 0) {
            reject({
                message: 'no datas available',
                status: 202
            })
        }
        resolve(datas)
    })
}

function getData(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(datas, id)
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

function insertData(newData) {
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(datas) }
        const date = { 
            data_criacao: helper.newDate(),
            data_atualizacao: helper.newDate()
        } 
        newData = { ...id, ...date, ...newData }
        datas.push(newData)
        helper.writeJSONFile(filename, datas)
        resolve(newData)
    })
}

function updateData(id, newData) { 
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(datas, id)
        .then(data => {             
            const index = datas.findIndex(p => p.id == data.id)
            id = { id: data.id } 
            
            const date = {
                data_atualizacao: helper.newDate()
            } 
            datas[index] = { ...id, ...date, ...newData }
            helper.writeJSONFile(filename, datas)
            resolve(datas[index])
        })
        .catch(err => reject(err))
    })
}

function deleteData(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(datas, id)
        .then(() => {
            datas = datas.filter(function(item){
                return item.id!=id
            })
            helper.writeJSONFile(filename, datas)
            resolve()
        })
        .catch(err => reject(err))
    })
}

// END - ESTADOS -------------------------------------
