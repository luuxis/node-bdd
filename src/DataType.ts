/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */


let BLOB = {
    BLOB: 'BLOB',
    no_datatype_specified: 'no datatype specified'
}

let INTEGER = {
    INT: 'INT',
    INTEGER: 'INTEGER',
    TINYINT: 'TINYINT',
    SMALLINT: 'SMALLINT',
    MEDIUMINT: 'MEDIUMINT',
    BIGINT: 'BIGINT',
    UNSIGNED_BIG_INT: 'UNSIGNED BIG INT',
    INT2: 'INT2',
    INT8: 'INT8'
}

let NUMERIC = {
    NUMERIC: 'NUMERIC',
    DECIMAL(number1 = 10, number2 = 5) {
        if (number1 > 10 || number2 > 5) return 'DECIMAL(10, 5)'
        return `VARCHAR(${number1}, ${number2})`
    },
    BOOLEAN: 'BOOLEAN',
    DATE: 'DATE',
    DATETIME: 'DATETIME'

}

let REAL = {
    REAL: 'REAL',
    DOUBLE: 'DOUBLE',
    DOUBLE_PRECISION: 'DOUBLE_PRECISION',
    FLOAT: 'FLOAT',
}

let TEXT = {
    CHARACTER(number = 20) {
        if (number > 20) return 'CHARACTER(20)'
        return `CHARACTER(${number})`
    },
    VARCHAR(number = 255) {
        if (number > 255) return 'VARCHAR(255)'
        return `VARCHAR(${number})`
    },
    VARYING_CHARACTER(number = 255) {
        if (number > 255) return 'VARYING CHARACTER(255)'
        return `VARYING CHARACTER(${number})`
    },
    NCHAR(number = 55) {
        if (number > 55) return 'NCHAR(55)'
        return `NCHAR(${number})`
    },
    NATIVE_CHARACTER(number = 70) {
        if (number > 70) return 'NATIVE CHARACTER(70)'
        return `NATIVE CHARACTER(${number})`
    },
    NVARCHAR(number = 100) {
        if (number > 100) return 'NVARCHAR(100)'
        return `NVARCHAR(${number})`
    },
    TEXT: 'TEXT',
    CLOB: 'CLOB'
}

export {
    BLOB,
    INTEGER,
    NUMERIC,
    REAL,
    TEXT
}