'use strict';

module.exports = {
  // La función 'up' se ejecuta cuando se aplica la migración.
  // Aquí es donde añadimos las columnas necesarias.
  async up(knex) {
    // Lista de tablas a las que necesitamos añadir las columnas 'locale' y 'document_id'.
    // Añade aquí cualquier otra tabla de tu Content Type que esté dando este error.
    const tablesToMigrate = ['logo_navbars', 'banner_principals'];

    for (const tableName of tablesToMigrate) {
      console.log(`Verificando y migrando tabla: ${tableName}`);

      // 1. Añadir la columna 'locale' si no existe
      const hasLocaleColumn = await knex.schema.hasColumn(tableName, 'locale');
      if (!hasLocaleColumn) {
        await knex.schema.table(tableName, table => {
          // La columna 'locale' almacena el código del idioma (ej. 'es', 'en').
          // La hacemos nullable inicialmente para no romper las filas existentes que no tienen valor.
          table.string('locale');
        });
        console.log(`Columna 'locale' añadida a ${tableName}.`);
      } else {
        console.log(`Columna 'locale' ya existe en ${tableName}, omitiendo.`);
      }

      // 2. Añadir la columna 'document_id' si no existe
      // Esta columna es esencial para el funcionamiento de la Internacionalización (i18n)
      // y la gestión de versiones de contenido en Strapi.
      const hasDocumentIdColumn = await knex.schema.hasColumn(tableName, 'document_id');
      if (!hasDocumentIdColumn) {
        await knex.schema.table(tableName, table => {
          table.string('document_id'); // También nullable inicialmente
        });
        console.log(`Columna 'document_id' añadida a ${tableName}.`);
      } else {
        console.log(`Columna 'document_id' ya existe en ${tableName}, omitiendo.`);
      }

      // IMPORTANTE: Después de que se añadan las columnas, si tienes datos existentes
      // y necesitas que tengan un valor por defecto para 'locale' (ej. 'es' si todo tu contenido es en español),
      // puedes ejecutar una actualización aquí. Sin embargo, Strapi generalmente maneja esto al guardar
      // o actualizar el contenido desde el panel de administración.
      // Si Strapi te sigue dando errores por 'locale' nulo después de esto,
      // considera descomentar y ajustar la siguiente línea para tu idioma predeterminado:
      // await knex(tableName).whereNull('locale').update({ locale: 'es' });
    }
  },

  // La función 'down' se ejecuta si necesitas revertir la migración (ej. en caso de error o rollback).
  // Aquí se elimina la columna que se añadió en 'up'.
  async down(knex) {
    const tablesToMigrate = ['logo_navbars', 'banner_principals'];

    for (const tableName of tablesToMigrate) {
      console.log(`Revertiendo migración para tabla: ${tableName}`);

      // Eliminar la columna 'locale'
      const hasLocaleColumn = await knex.schema.hasColumn(tableName, 'locale');
      if (hasLocaleColumn) {
        await knex.schema.table(tableName, table => {
          table.dropColumn('locale');
        });
        console.log(`Columna 'locale' eliminada de ${tableName}.`);
      }

      // Eliminar la columna 'document_id'
      const hasDocumentIdColumn = await knex.schema.hasColumn(tableName, 'document_id');
      if (hasDocumentIdColumn) {
        await knex.schema.table(tableName, table => {
          table.dropColumn('document_id');
        });
        console.log(`Columna 'document_id' eliminada de ${tableName}.`);
      }
    }
  },
};
