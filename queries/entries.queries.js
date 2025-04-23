const queries = {
  getAllEntries: `
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
  `,
  updateEntryByTitle: `
  UPDATE entries
    SET title = $1, content = $2, category = $3
    WHERE title = $4
    RETURNING *
  `,
  deleteEntryByTitle: `
  DELETE FROM entries
  WHERE title = $1
  `
};

module.exports = queries;