/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

import sqlite from 'sqlite3';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';


export default class Database {
    async intilize(config: any) {
        return await new Promise((resolve, rejects) => {
            let pathFile = config.path
            if (pathFile) pathFile = path.resolve(pathFile).replace('\\', '/')
            else pathFile = path.resolve(`${__dirname}/../database`).replace('\\', '/')

            if (!existsSync(pathFile)) mkdirSync(pathFile, { recursive: true })
            let db = new sqlite.Database(`${pathFile}/${config.databaseName}.${config.fileType}`)

            let columns = [
                'id INTEGER PRIMARY KEY',
                ...Object.entries(config.tableColumns).map((data: any) => data = `${data[0]} ${data[1]}`),
                'createdAt TATETIME',
                'updatedAt TATETIME'
            ]

            db.run(`CREATE TABLE IF NOT EXISTS ${config.tableName}(${columns.join(',')})`)

            resolve(db)
        })
    }

    async createData(table: any, data: any) {
        return await new Promise((resolve, rejects) => {

        })
    }
    
    async getAllData(table: any) {
        return await new Promise((resolve, rejects) => {

        })
    }

    async getDataById(table: any, id: any) {
        return await new Promise((resolve, rejects) => {

        })
    }

    async updateData(table: any, id: any, data: any) {
        return await new Promise((resolve, rejects) => {

        })
    }

    async deleteData(table: any, id: any) {
        return await new Promise((resolve, rejects) => {

        })
    }

    async deleteAllData(table: any) {
        return await new Promise((resolve, rejects) => {

        })
    }
}