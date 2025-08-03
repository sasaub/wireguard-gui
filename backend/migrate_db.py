#!/usr/bin/env python3
"""
Database migration script to add new fields to WireGuardPeer table
"""

import sqlite3
import os

def migrate_database():
    db_path = os.path.join(os.path.dirname(__file__), 'instance', 'wireguard.db')
    
    if not os.path.exists(db_path):
        print("Database file not found. Creating new database...")
        return
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if new columns already exist
        cursor.execute("PRAGMA table_info(wire_guard_peer)")
        columns = [column[1] for column in cursor.fetchall()]
        
        # Add new columns if they don't exist
        if 'allowed_ips_to_peer' not in columns:
            print("Adding allowed_ips_to_peer column...")
            cursor.execute("ALTER TABLE wire_guard_peer ADD COLUMN allowed_ips_to_peer TEXT")
        
        if 'allowed_ips_from_peer' not in columns:
            print("Adding allowed_ips_from_peer column...")
            cursor.execute("ALTER TABLE wire_guard_peer ADD COLUMN allowed_ips_from_peer TEXT")
        
        conn.commit()
        print("Migration completed successfully!")
        
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == '__main__':
    migrate_database() 