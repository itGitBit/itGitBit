import { createPool } from 'mysql2/promise';

// Create a connection pool
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'recipes'
});

// Function to start a transaction
async function beginTransaction() {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    return connection;
}

// Function to commit a transaction
async function commitTransaction(connection) {
    await connection.commit();
    connection.release();
}

// Function to roll back a transaction
async function rollbackTransaction(connection) {
    await connection.rollback();
    connection.release();
}

// One function for executing select / insert / update / delete with transaction support
async function executeWithParameters(sql, parameters, connection = pool) {
    if (connection === pool) {
        // Use connection directly from pool for non-transactional operations
        const [result] = await pool.execute(sql, parameters);
        return result;
    } else {
        // Use provided connection for transactional operations
        const [result] = await connection.execute(sql, parameters);
        return result;
    }
}

async function execute(sql, connection = pool) {
    try {
        const [result] = await connection.execute(sql);
        return result;
    } catch (error) {
        throw error;
    }
}


export {
    executeWithParameters,
    beginTransaction,
    commitTransaction,
    rollbackTransaction,
    execute
};
