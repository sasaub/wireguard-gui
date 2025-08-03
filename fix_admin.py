#!/usr/bin/env python3

import sys
import os
sys.path.append('/opt/wireguard-gui/backend')

from app import app, db, User, hash_password

print("Fixing admin user password...")

# Create application context
with app.app_context():
    # Find admin user
    admin_user = User.query.filter_by(username="admin").first()
    
    if admin_user:
        print(f"Found admin user: {admin_user.username}")
        print(f"Old password hash: {admin_user.password_hash}")
        
        # Update password hash
        new_password_hash = hash_password("admin")
        admin_user.password_hash = new_password_hash
        admin_user.is_verified = True
        
        # Commit changes
        db.session.commit()
        
        print(f"New password hash: {new_password_hash}")
        print("Admin user password updated successfully!")
        
        # Test password verification
        from app import verify_password
        is_valid = verify_password("admin", admin_user.password_hash)
        print(f"Password verification test: {is_valid}")
    else:
        print("Admin user not found!") 