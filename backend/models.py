#!/usr/bin/env python3
"""
Database models for WireGuard GUI Manager
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_verified = db.Column(db.Boolean, default=False)
    verification_token = db.Column(db.String(200), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class WireGuardServer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    interface_name = db.Column(db.String(50), nullable=False)
    private_key = db.Column(db.Text, nullable=False)
    public_key = db.Column(db.Text, nullable=False)
    listen_port = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

class WireGuardPeer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    public_key = db.Column(db.Text, nullable=False)
    private_key = db.Column(db.Text, nullable=False)
    allowed_ips = db.Column(db.String(200), nullable=False)  # Peer IP adresa
    allowed_ips_to_peer = db.Column(db.String(500), nullable=True)  # Adrese od MikroTik-a ka peer-u
    allowed_ips_from_peer = db.Column(db.String(500), nullable=True)  # Adrese od peer-a ka MikroTik-u
    server_id = db.Column(db.Integer, db.ForeignKey('wire_guard_server.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    last_handshake = db.Column(db.DateTime)
    transfer_rx = db.Column(db.BigInteger, default=0)
    transfer_tx = db.Column(db.BigInteger, default=0)

class StaticRoute(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(50), nullable=False)
    gateway = db.Column(db.String(50), nullable=False)
    server_id = db.Column(db.Integer, db.ForeignKey('wire_guard_server.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow) 