from app import app, db, User, hash_password
from datetime import datetime

with app.app_context():
    # Create all tables
    db.create_all()
    print("Database tables created successfully!")
    
    # Create admin user if not exists
    admin = User.query.filter_by(username='admin').first()
    if not admin:
        admin = User(
            username='admin',
            email='admin@example.com',
            password_hash=hash_password('admin123'),
            is_admin=True,
            is_verified=True
        )
        db.session.add(admin)
        db.session.commit()
        print("Admin user created: admin / admin123")
    else:
        print("Admin user already exists")
    
    print("Database setup completed!") 