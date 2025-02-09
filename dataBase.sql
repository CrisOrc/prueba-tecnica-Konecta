CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('ADMIN', 'EMPLOYEE', 'USER'))
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    hire_date TIMESTAMP NOT NULL,
    salary FLOAT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(50) NOT NULL,
    summary VARCHAR(50),
    employee_id INT,
    admin_id INT,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL,
    FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Enum simulation in PostgreSQL is done using CHECK constraint on a VARCHAR field
CREATE TYPE role_enum AS ENUM ('ADMIN', 'EMPLOYEE', 'USER');
