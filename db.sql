-- Tabela de Usuários
CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    sobrenome VARCHAR(50),
    email VARCHAR(100),
    senha VARCHAR(100),
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    role ENUM('ADMIN', 'CLIENT') DEFAULT 'CLIENT'
);

-- Tabela de Materiais
CREATE TABLE Materials (
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    nome_do_material VARCHAR(100),
    descricao TEXT,
    preco_por_unidade DECIMAL(10, 2)
);

-- Tabela de Pedidos
CREATE TABLE Orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    data_do_pedido DATE,
    status_do_pedido VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tabela de Itens do Pedido
CREATE TABLE Order_Items (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    material_id INT,
    quantidade INT,
    data_do_evento DATE,
    horario_do_evento TIME,
    local_do_evento VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (material_id) REFERENCES Materials(material_id)
);

-- Tabela de Pagamentos
CREATE TABLE Payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    metodo_de_pagamento VARCHAR(100),
    valor_total DECIMAL(10, 2),
    data_do_pagamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_do_pagamento VARCHAR(50),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);

-- Tabela de Aprovação de Pedidos
CREATE TABLE Order_Approvals (
    approval_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    order_id INT,
    data_da_aprovacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    CONSTRAINT chk_admin_role CHECK (role = 'ADMIN')
); 
