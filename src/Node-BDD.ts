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
            let db = new sqlite.Database(`${pathFile}/${config.databaseName}.${config.fileType}`, err => rejects(err))

            let columns = [
                'id INTEGER PRIMARY KEY',
                ...Object.entries(config.tableColumns).map((data: any) => data = `${data[0]} ${data[1]}`),
                'createdAt TATETIME',
                'updatedAt TATETIME'
            ]

            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS ${config.tableName}(${columns.join(', ')})`, err => {
                    if (err) rejects(err)
                })
            })
            resolve({ config, table: db })
        })
    }

    async createData({ table, config }, data: any) {
        return await new Promise((resolve: any, rejects) => {
            data = Object.entries(data)

            let columns = [
                ...data.map((data: any) => data = data[0]),
                'createdAt',
                'updatedAt'
            ]

            data = [
                ...data.map((data: any) => data = data[1] ? data[1] : 'null'),
                new Date().toISOString(),
                new Date().toISOString()
            ]

            let columnsNumber = data.map((data: any) => data = '?')

            table.serialize(() => {
                table.run(`INSERT INTO ${config.tableName}(${columns.join(', ')}) VALUES(${columnsNumber.join(', ')})`, data, (err: any) => {
                    if (err) rejects(err)
                })
            })
            resolve()
        })
    }

    async updateData({ table, config }, data: any, id: any) {
        return await new Promise((resolve: any, rejects) => {
            table.serialize(() => {
                data = Object.entries(data)

                let columns = [
                    ...data.map((data: any) => data = data[0]),
                    'updatedAt'
                ]

                data = [
                    ...data.map((data: any) => data = data[1] ? data[1] : 'null'),
                    new Date().toISOString()
                ]

                let newsData = data.map((element: any, int: any) => element = `${columns[int]} = '${data[int]}'`)
                
                table.run(`UPDATE ${config.tableName} SET ${newsData.join(', ')} WHERE id = ${id}`, (err: any) => {
                    if (err) rejects(err)
                })
            })
            resolve()
        })
    }

    async getAllData({ table, config }) {
        return await new Promise((resolve, rejects) => {
            table.serialize(() => {
                table.all(`SELECT * FROM ${config.tableName}`, (err: any, data: any) => {
                    if (err) rejects(err)
                    resolve(data)
                })
            })
        })
    }

    async getDataById({ table, config }, id: any) {
        return await new Promise((resolve, rejects) => {
            table.serialize(() => {
                table.get(`SELECT * FROM ${config.tableName} WHERE id = ${id}`, (err: any, data: any) => {
                    if (err) rejects(err)
                    resolve(data)
                })
            })
        })
    }

    async deleteData({ table, config }, id: any) {
        return await new Promise((resolve, rejects) => {
            table.serialize(() => {
                table.run(`DELETE FROM ${config.tableName} WHERE id = ${id}`, (err: any, data: any) => {
                    if (err) rejects(err)
                    resolve(data)
                })
            })
        })
    }

    async deleteAllData({ table, config }) {
        return await new Promise((resolve, rejects) => {
            table.serialize(() => {
                table.run(`DELETE FROM ${config.tableName}`, (err: any, data: any) => {
                    if (err) rejects(err)
                    resolve(data)
                })
            })
        })
    }
}