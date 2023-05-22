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
                'createdAt DATETIME',
                'updatedAt DATETIME'
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
                new Date(),
                new Date()
            ]

            let columnsNumber = data.map((data: any) => data = '?')

            table.serialize(() => {
                table.run(`INSERT INTO ${config.tableName}(${columns.join(', ')}) VALUES(${columnsNumber.join(', ')})`, data, (err: any) => {
                    if (err) rejects(err)
                })
                table.get(`SELECT * FROM ${config.tableName} WHERE id = last_insert_rowid()`, (err: any, data: any) => {
                    if (err) rejects(err)
                    resolve(data)
                })
            })
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
                    new Date()
                ]

                let newsData = data.map((element: any, int: any) => element = `${columns[int]} = '${data[int]}'`)

                table.run(`UPDATE ${config.tableName} SET ${newsData.join(', ')} WHERE id = ${id}`, (err: any) => {
                    if (err) rejects(err)
                })
            })
            resolve()
        })
    }

    async createColumnsIfNoteExist({ table, config }: any, Columns: any) {
        let columnsList: any = await this.getColumnsList({ table, config })

        Object.keys(Columns).forEach(key => {
            if (columnsList.some((item: any) => item.name === key)) {
                delete Columns[key];
            }
        });

        if (Object.entries(columnsList).length > 0) {
            await this.createNewsColumns({ table, config }, Columns)
        }
    }

    async createNewsColumns({ table, config }: any, Columns: any) {
        return new Promise((resolve: any, rejects) => {
            table.serialize(() => {
                let newColumns = [
                    ...Object.entries(Columns).map((data: any) => data = `${data[0]} ${data[1]}`)
                ]

                for (let column of newColumns) {
                    table.run(`ALTER TABLE ${config.tableName} ADD ${column}`, (err: any) => {
                        if (err) rejects(err)
                    })
                }
                resolve()
            })
        })
    }

    async getColumnsList({ table, config }: any) {
        return await new Promise((resolve, rejects) => {
            table.serialize(() => {
                table.all(`PRAGMA table_info('${config.tableName}')`, (err: any, data: any) => {
                    if (err) rejects(err)
                    resolve(data.map((res: any) => res = { name: res.name }))
                })
            })
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