import Database from "better-sqlite3";

const db = new Database("pokemon.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS pokemon (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    height INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    main_ability TEXT NOT NULL,
    audio_url TEXT NOT NULL,
    sprite_url TEXT NOT NULL,
    flavor_text TEXT NOT NULL,
    first_type TEXT NOT NULL,
    second_type TEXT,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    special_attack INTEGER NOT NULL,
    special_defense INTEGER NOT NULL,
    speed INTEGER NOT NULL
    )
`);

export const insertPokemon = db.prepare(`
    INSERT OR REPLACE INTO pokemon (
    id,
    name,
    height,
    weight,
    main_ability,
    audio_url,
    sprite_url,
    flavor_text,
    first_type,
    second_type,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    
`);

export default db;
