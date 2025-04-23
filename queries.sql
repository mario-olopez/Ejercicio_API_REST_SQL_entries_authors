CREATE TABLE authors (
  id_author serial NOT NULL PRIMARY KEY, 
  name varchar(45) NOT NULL, 
  surname varchar(45) NOT NULL, 
  email varchar(100) NOT NULL UNIQUE,
  image varchar(255)
);

-- Crear tabla entries
CREATE TABLE entries (
  id_entry serial NOT NULL PRIMARY KEY, 
  title varchar(100) NOT NULL, 
  content text NOT NULL, 
  date date DEFAULT CURRENT_DATE,
  id_author int,
  category varchar(15),
  FOREIGN KEY (id_author) REFERENCES authors(id_author)
);

-- Insertar datos en tabla authors
INSERT INTO authors(name,surname,email,image)
VALUES
('Alejandru','Regex','alejandru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/75.jpg'),
('Birja','Rivera','birja@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/60.jpg'),
('Alvaru','Riveru','alvaru@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/45.jpg'),
('Muchelle','Wuallus','muchelle@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/women/72.jpg'),
('Albertu','Henriques','albertu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/33.jpg'),
('Guillermu','Develaweyer','guillermu@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/34.jpg'),
('Jabier','Hespinoza','jabier@thebridgeschool.es','https://randomuser.me/api/portraits/thumb/men/35.jpg');



-- Insertar datos en tabla entries
INSERT INTO entries(title,content,id_author,category)
VALUES 
('Noticia: SOL en Madrid','Contenido noticia 1',(SELECT id_author FROM authors WHERE email='alejandru@thebridgeschool.es'),'Tiempo'),
('Noticia: Un panda suelto por la ciudad','El panda se comió todas las frutas de una tienda',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
('El rayo gana la champions','Victoria por goleada en la final de la champions',(SELECT id_author FROM authors WHERE email='albertu@thebridgeschool.es'),'Deportes'),
('Amanece Madrid lleno de arena','La calima satura Madrid de arena. Pérdidas millonarias',(SELECT id_author FROM authors WHERE email='birja@thebridgeschool.es'),'Sucesos'),
('Descubren el motor de agua','Fin de la gasolina. A partir de ahora usaremos agua en nuestros coches',(SELECT id_author FROM authors WHERE email='alvaru@thebridgeschool.es'),'Ciencia');



-- Alterar tabla para que no se puedan insertar entries repetidas por título
ALTER TABLE entries
ADD UNIQUE (title);


-- Modificar query para que devuelva una respuesta con los datos del autor y sin ID de la entry
SELECT 
      entries.title, 
      entries.content, 
      entries.date, 
      entries.category,
      authors.name, 
      authors.surname, 
      authors.image
    FROM entries
    LEFT JOIN authors ON entries.id_author = authors.id_author
    ORDER BY entries.date DESC

-- PUT para modificar una entrada con nuevos datos y que ha sido buscada por título.
UPDATE entries
    SET title = $1, content = $2, category = $3
    WHERE title = $4
    RETURNING *


-- GET para retornar todos los datos de los autores
SELECT * FROM authors

-- GET para retornar un objeto con los datos del autor por email
SELECT * FROM authors WHERE email = $1

-- POST para crear autor
INSERT INTO authors (name, surname, email, image)
    VALUES ($1, $2, $3, $4)

-- PUT para actualizar autor
UPDATE authors
    SET name = $1, surname = $2, image = $3
    WHERE email = $4
    RETURNING *

-- DELETE para borrar un autor buscado por email
DELETE FROM authors
    WHERE email = $1
    RETURNING *