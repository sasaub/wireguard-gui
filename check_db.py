#!/usr/bin/env python3

import sys
import os
sys.path.append('/opt/wireguard-gui/backend')

from app import app, db, User, hash_password

print("Checking database users...")

# Create application context
with app.app_context():
    # Get all users
    users = User.query.all()
    print(f"Found {len(users)} users:")

    for user in users:
        print(f"Username: {user.username}")
        print(f"  is_admin: {user.is_admin}")
        print(f"  is_verified: {user.is_verified}")
        print(f"  has email: {hasattr(user, 'email')}")
        print(f"  password_hash length: {len(user.password_hash) if user.password_hash else 0}")
        print()

    # Test password verification
    test_password = "admin"
    test_hash = hash_password(test_password)
    print(f"Test password hash: {test_hash}")

    # Check if admin user exists and test password
    admin_user = User.query.filter_by(username="admin").first()
    if admin_user:
        print(f"Admin user found: {admin_user.username}")
        print(f"Admin password hash: {admin_user.password_hash}")
        
        # Test password verification
        from app import verify_password
        is_valid = verify_password(test_password, admin_user.password_hash)
        print(f"Password verification result: {is_valid}")
    else:
        print("Admin user not found!") 