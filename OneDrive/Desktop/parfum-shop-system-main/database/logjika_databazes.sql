USE world;

CREATE VIEW view_inventari_parfumeve AS
SELECT 
    p.parfum_id, 
    p.emri AS parfumi, 
    m.emri AS marka, 
    k.emri AS kategoria, 
    p.cmimi, 
    p.sasia_stok
FROM parfumet p
JOIN markat m ON p.marka_id = m.marka_id
JOIN kategorite k ON p.kategori_id = k.kategori_id;

DELIMITER //

DROP PROCEDURE IF EXISTS regjistro_shitje //

CREATE PROCEDURE regjistro_shitje(
    IN p_klient_id INT,
    IN p_punetor_id INT,
    IN p_parfum_id INT,
    IN p_sasia INT,
    IN p_metoda_pageses VARCHAR(50)
)
BEGIN 
    DECLARE v_cmimi DECIMAL(10,2);
    DECLARE v_total DECIMAL(10,2);
    DECLARE v_shitje_id INT;
     
    SELECT cmimi INTO v_cmimi FROM parfumet WHERE parfum_id = p_parfum_id;
    SET v_total = v_cmimi * p_sasia;
     
    INSERT INTO shitjet(klient_id, punetor_id, shuma_totale, metoda_pageses)
    VALUES (p_klient_id, p_punetor_id, v_total, p_metoda_pageses);
     
    SET v_shitje_id = LAST_INSERT_ID();
     
    INSERT INTO detajet_shitjes(shitje_id, parfum_id, sasia, cmimi_njesi, cmimi_total)
    VALUES (v_shitje_id, p_parfum_id, p_sasia, v_cmimi, v_total);
     
    UPDATE parfumet SET sasia_stok = sasia_stok - p_sasia WHERE parfum_id = p_parfum_id;
END //

DELIMITER ;regjistro_shitje

